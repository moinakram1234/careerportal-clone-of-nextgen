import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import connectDB from "../mongodb/db";
import { FormData } from "../mongodb/schema";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      await connectDB();

      const user = await FormData.findOne({
        user_email: email,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const name = user.personalInfo.name;
      const AppID = user._id;

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
        },
      });

      const mailOptions = {
      from: `"Your HR" <no-reply@pepsiisb.com>`,
        to: email, // List of recipients
        subject: "We've received your application!", // Subject line
        html: `
     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Haidri Beverages Talent Acquisition</title>
    <style>
        body {
            font-family: Arial, sans-serif; /* Ensures a more modern font is used */
            margin: 0;
            padding: 0;
         
            height: 100vh; /* Full height of the viewport */
            background-color: #f0f0f0; /* A light background color */
        }
   
        p {
            font-size: 15px; /* Sets a specific font size for the paragraph */
        }
    </style>
</head>
<body>
<div style="padding: 10px;">
  <p>
      <p>Dear ${name},</p>
    </p>
    <p>
        Warm greetings from Haidri Beverages Talent Acquisition Team!
    </p>
    <p>
        Congratulations on taking the first step in our talent recruiting process by applying for our NextGen Leaders Program! Your unique application ID is ${AppID}, which you can use to track the status of your application.  
    </p>
    <h1>
        What's Next for You?
    </h1>
    <img 
        src="https://res.cloudinary.com/dammqml1x/image/upload/v1720769259/zubihczqxgrcksndmfbt.png" 
        alt="email" 
        style="width: 80%; height: auto;"
    >
       <p>
     Please note that due to the high volume of applications, it may take a few days for us to get back to you as we carefully review each one. In the meantime, keep an eye on your Candidate Dashboard to track your progress. We also invite you to follow us on <a href="https://www.linkedin.com/company/haidri-beverages-pvt.-ltd.-pepsicola-international-franchise/" target="_blank">LinkedIn</a>, <a href="https://www.facebook.com/people/PepsiCo-Franchise-North-Pakistan/61559649879114/" target="_blank">Facebook</a>, and <a href="https://www.instagram.com/pepsicofranchise_northpakistan/?igsh=MXNnMG1sN211czZxdg%3D%3D" target="_blank">Instagram</a> to get a glimpse of what life at Haidri Beverages is all about.  <p>Best of luck!
</p>
<p>
Talent Acquisition Team
</p>
 </div>
</body>
</html>
        `, // HTML body
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to send email" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
