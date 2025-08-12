// // import Otp from "../models/Popotp"
// // import nodemailer from "nodemailer";

// // // Send OTPs
// // export const sendOtpPop = async (req, res) => {
// //   try {
// //     const { email } = req.body;
// //     if (!email) return res.status(400).json({ success: false, message: "Email is required" });

// //     // Generate OTP
// //     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
// //     const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

// //     // Save to DB (overwrite old OTP if exists)
// //     await Otp.findOneAndUpdate(
// //       { email },
// //       { otp: otpCode, expiresAt },
// //       { upsert: true, new: true }
// //     );

    
// //     const transporter = nodemailer.createTransport({
// //       host: smtp.hostinger.com,
// //       port: 587,
// //       secure: false, // true for SSL (465), false for TLS (587)
// //       auth: {
// //         user: "info@easewithdraw.com",
// //         pass: "Guru@Guru123"
// //       }
// //     });

// //     await transporter.sendMail({
// //       from: "info@easewithdraw.com",
// //       to: email,
// //       subject: "Your OTP Code",
// //       text: `Your OTP is ${otpCode}. It will expire in 5 minutes.`,
// //     });

// //     return res.json({ success: true, message: "OTP sent to your email" });

// //   } catch (error) {
// //     console.error("Send OTP error:", error);
// //     res.status(500).json({ success: false, message: "Failed to send OTP" });
// //   }
// // };


// import Otp from "../models/Popotp.js";
// import nodemailer from "nodemailer";
// import jwt from "jsonwebtoken";

// export const sendOtpPop = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     // ✅ Check if OTP already exists for email
//     let otpRecord = await Otp.findOne({ email });

//     // Generate OTP
//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

//     if (otpRecord) {
//       otpRecord.otp = otpCode;
//       otpRecord.expiresAt = expiresAt;
//       await otpRecord.save();
//     } else {
//       otpRecord = new Otp({
//         email,
//         otp: otpCode,
//         expiresAt,
//       });
//       await otpRecord.save();
//     }

//     // ✅ Send email via Nodemailer
//     const transporter = nodemailer.createTransport({
//       host: "smtp.hostinger.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "info@easewithdraw.com",
//         pass: "Guru@Guru123",
//       },
//     });

//     await transporter.sendMail({
//       from: "info@easewithdraw.com",
//       to: email,
//       subject: "EaseWithdraw Email Verification",
//       text: `Your OTP is ${otpCode}. It will expire in 5 minutes.`,
//     });

//     // ✅ Generate a temporary token (optional)
//     const token = jwt.sign(
//       { email },
//       "your_jwt_secret",
//       { expiresIn: "10m" }
//     );

//     return res.status(200).json({
//       message: "OTP sent successfully",
//       token,
//     });

//   } catch (error) {
//     console.error("sendOtpPop Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// export const verifyOtpPop = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) return res.status(400).json({ success: false, message: "Email and OTP are required" });

//     const otpRecord = await Otp.findOne({ email });
//     if (!otpRecord) return res.status(400).json({ success: false, message: "OTP not found" });

//     if (otpRecord.otp !== otp) {
//       return res.status(400).json({ success: false, message: "Invalid OTP" });
//     }

//     if (otpRecord.expiresAt < new Date()) {
//       return res.status(400).json({ success: false, message: "OTP expired" });
//     }

//     // ✅ OTP is valid — delete it from DB
//     await Otp.deleteOne({ email });

//     return res.json({ success: true, message: "Email verified successfully" });

//   } catch (error) {
//     console.error("Verify OTP error:", error);
//     res.status(500).json({ success: false, message: "OTP verification failed" });
//   }
// };







import User from "../models/User.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const sendOtpPop = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store OTP in user's otpData
    user.otpData = { email, otp: otpCode, expiresAt };
    await user.save();

    // Send email via Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: "info@easewithdraw.com",
        pass: "Guru@Guru123",
      },
    });

    await transporter.sendMail({
      from: "info@easewithdraw.com",
      to: email,
      subject: "EaseWithdraw Email Verification",
      text: `Your OTP is ${otpCode}. It will expire in 5 minutes.`,
    });

    // Optional: Generate a token
    const token = jwt.sign({ email }, "your_jwt_secret", { expiresIn: "10m" });

    return res.status(200).json({ message: "OTP sent successfully", token });

  } catch (error) {
    console.error("sendOtpPop Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const verifyOtpPop = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ success: false, message: "Email and OTP are required" });

    const user = await User.findOne({ email });
    if (!user || !user.otpData)
      return res.status(400).json({ success: false, message: "OTP not found" });

    if (user.otpData.otp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    if (user.otpData.expiresAt < new Date())
      return res.status(400).json({ success: false, message: "OTP expired" });

    // OTP is valid → clear it
    user.otpData = undefined;
    await user.save();

    return res.json({ success: true, message: "Email verified successfully" });

  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ success: false, message: "OTP verification failed" });
  }
};
