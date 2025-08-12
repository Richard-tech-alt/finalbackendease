import Otp from "../models/PopOtp";
import nodemailer from "nodemailer";

// Send OTP
export const sendOtpPop = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    // Save to DB (overwrite old OTP if exists)
    await Otp.findOneAndUpdate(
      { email },
      { otp: otpCode, expiresAt },
      { upsert: true, new: true }
    );

    
    const transporter = nodemailer.createTransport({
      host: smtp.hostinger.com,
      port: 587,
      secure: false, // true for SSL (465), false for TLS (587)
      auth: {
        user: "info@easewithdraw.com",
        pass: "Guru@Guru123"
      }
    });

    await transporter.sendMail({
      from: "info@easewithdraw.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otpCode}. It will expire in 5 minutes.`,
    });

    return res.json({ success: true, message: "OTP sent to your email" });

  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};



export const verifyOtpPop = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false, message: "Email and OTP are required" });

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) return res.status(400).json({ success: false, message: "OTP not found" });

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // ✅ OTP is valid — delete it from DB
    await Otp.deleteOne({ email });

    return res.json({ success: true, message: "Email verified successfully" });

  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ success: false, message: "OTP verification failed" });
  }
};