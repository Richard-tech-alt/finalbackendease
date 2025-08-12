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
import { sendWelcomeEmail } from "../helpers/welcomeMail.js";

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

    const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
        background-color: #f9f9f9;
        padding: 0;
        margin: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 30px auto;
        background: #ffffff;
        border: 1px solid #e4e4e4;
        border-radius: 8px;
        overflow: hidden;
      }
      .header {
        text-align: center;
        padding: 20px;
        border-bottom: 1px solid #e4e4e4;
      }
      .logo {
        max-width: 160px;
        height: auto;
      }
      .content {
        padding: 20px;
      }
      .verification-code {
        font-size: 24px;
        font-weight: bold;
        color: #4285f4;
        padding: 10px;
        background-color: #f5f5f5;
        border-radius: 4px;
        text-align: center;
        margin: 15px 0;
        letter-spacing: 5px;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #777777;
        text-align: center;
        padding: 15px;
        border-top: 1px solid #e4e4e4;
      }
      .cta-btn {
        display: inline-block;
        padding: 10px 20px;
        background-color: #4285f4;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 15px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img src="https://res.cloudinary.com/dluma1hts/image/upload/v1754981845/easy-withdraw-logo_yrtrgp.png" alt="EaseWithdraw" class="logo">
      </div>
      <div class="content">
        <h3 style="margin-top: 30px;">Your Verification Code</h3>
        <div class="verification-code">${otpCode}</div>
        <p>This code will expire in 10 minutes. If you didn’t request this verification, please ignore this email.</p>
        <p>Need help or guidance?<br>We’re here 24/7 to support you every step of the way.</p>
        <p>To new beginnings,<br>Team EaseWithdraw<br>support@easewithdraw.com</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} EaseWithdraw. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;


    await transporter.sendMail({
      from: "info@easewithdraw.com",
      to: email,
      subject: "EaseWithdraw Email Verification",
       html: htmlContent
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
  await sendWelcomeEmail(user.email, user.firstName);
    return res.json({ success: true, message: "Email verified successfully" });

  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ success: false, message: "OTP verification failed" });
  }
};
