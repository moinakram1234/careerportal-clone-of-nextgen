// sendOtpEmail.js
import nodemailer from "nodemailer";
import { Otp, User } from "./schema";
import connectDB from "./db";
connectDB();

const sendOtpEmail = async (email) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      console.log("Email does not exist.");
      return false;
    }

    // Generate OTP (replace this with your OTP generation logic)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Check if the email already exists in the database
    const existingOtp = await Otp.findOne({
      email,
    });

    if (existingOtp) {
      // If email exists, update the OTP
      await Otp.updateOne({
        email,
      }, {
        otp,
      });
    } else {
      // If email doesn't exist, create a new OTP
      await Otp.create({
        email,
        otp,
      });
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // Insecure connection as Gmail uses STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      // Configure your SMTP details here
    });

    // Compose the email
    const mailOptions = {
      from: "muhayuddin7777@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};

const verifyOtp = async (email, otp) => {
  try {
    // Check if the OTP is valid
    const existingOtp = await Otp.findOne({
      email,
    });

    if (!existingOtp || existingOtp.otp !== otp) {
      return false; // Invalid OTP or already verified
    }

    // Update isVerified to true in the User model
    await User.updateOne({
      email,
    }, {
      isVerified: true,
    });

    return true; // OTP verified successfully
  } catch (error) {
    console.error("Error verifying OTP: ", error);
    return false;
  }
};

export { sendOtpEmail, verifyOtp };
