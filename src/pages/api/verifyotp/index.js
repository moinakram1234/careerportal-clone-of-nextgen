import { verifyOtp } from "mongodb/otp";


// pages/api/verify-otp.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, otp } = req.body;

  try {
    const isOtpVerified = await verifyOtp(email, otp);

    if (isOtpVerified) {
      res.status(200).json({ success: true, message: "OTP verified successfully." });
    } else {
      res.status(400).json({ success: false, message: "Invalid OTP or already verified." });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}
