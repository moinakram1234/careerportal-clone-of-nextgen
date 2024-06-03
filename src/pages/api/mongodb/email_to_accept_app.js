import nodemailer from "nodemailer";
import { create_accepted_applicant_status } from "./reject_or_accept_app";

const sendEmailToApplicant = async (message) => {


  try {
    
    await create_accepted_applicant_status(message._id, message.to);
   console.log(message.to);
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

    // Iterate through each user and send email

    // Compose the email
    const mailOptions = {
      from: message.from,
      to: message.to,
      subject: message.subject,
      html: generateEmailTemplate(message),
    };
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);

    console.log("emails sent successfully");
  } catch (error) {
    console.error("Error sending emails: ", error);
  }
};
const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
};
// Function to generate HTML email template with job post details
const generateEmailTemplate = (message) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Job Post Notification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    color: #333;
                }
                h2 {
                    color: #444;
                }
                hr {
                    border: 0;
                    border-top: 1px solid #eee;
                }
                .job-details {
                    background-color: #f9f9f9;
                    padding: 20px;
                    margin-top: 20px;
                    border-radius: 5px;
                }
                .job-details p {
                    margin: 0 0 10px;
                }
                .job-details p:last-child {
                    margin-bottom: 0;
                }
            </style>
        </head>
        <body>
  <div>${message.content}</div>
   
        </body>
        </html>
    `;
};

export default sendEmailToApplicant;
