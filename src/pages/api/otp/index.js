// pages/api/send-otp.js

import { sendOtpEmail } from "mongodb/otp";



export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Send the OTP via email
    const emailSent = await sendOtpEmail(email);

    if (emailSent) {
      return res.status(200).json({ message: 'OTP sent successfully' });
    } else {
      return res.status(500).json({ error: 'This email does not exist...' });
    }
  }

  return res.status(405).end(); // Method Not Allowed
}
