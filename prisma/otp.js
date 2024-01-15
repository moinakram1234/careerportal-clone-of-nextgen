// sendOtpEmail.js
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const sendOtpEmail = async (email) => {
 //if user is not exist.....
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  
  if (!existingUser) {
    console.log("Email does not exist.");
    return false;
  }

  // Generate OTP (replace this with your OTP generation logic)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Check if the email already exists in the database
  const existingOtp = await prisma.otp.findUnique({
    where: {
      email,
    },
  });

  if (existingOtp) {
    // If email exists, update the OTP
    await prisma.otp.update({
      where: {
        email,
      },
      data: {
        otp,
      },
    });
  } else {
    // If email doesn't exist, create a new OTP
    await prisma.otp.create({
      data: {
        email,
        otp,
      },
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
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};

const verifyOtp = async (email, otp) => {
  console.log(email, otp);
  const existingOtp = await prisma.otp.findUnique({
    where: {
      email,
    },
  });
console.log(existingOtp)
  if (!existingOtp  || existingOtp.otp !== otp) {
    return false; // Invalid OTP or already verified
  }

  // Update isVerified to true
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      otp: true,
    },
  });

  return true; // OTP verified successfully
};

export { sendOtpEmail, verifyOtp };
