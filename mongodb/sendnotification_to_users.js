import nodemailer from "nodemailer";
import { getAllUsers } from "./user"; // Assuming you have a function to get all users
import { getPostById } from "./jobpost"; // Assuming you have a function to get a post by ID

const sendEmailToAllUsers = async (postId) => {
  try {
    // Fetch the job post by ID
    const post = await getPostById(postId);

    // Fetch all users from the database
    const allUsers = await getAllUsers();

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

    // Iterate through each user and send email
    for (const user of allUsers) {
      const email = user.email;

      // Compose the email
      const mailOptions = {
        from: "Haidri Beverages ",
        to: email,
        subject: "New Job Opportunity at Haidri Beverages",
        html: generateEmailTemplate(post),
      };

      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: ", info.messageId);
    }

    console.log("All emails sent successfully");
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
const generateEmailTemplate = (post) => {
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
            <div>
            <div style="display: flex; align-items: center;">
                <img src="https://assets1.progressivegrocer.com/files/s3fs-public/styles/hero/public/2024-03/pepsi_logo.jpg?VersionId=QjsRJisld5bShaTCn1MAwrm6KeBmCx77&itok=wsN-h5Rp" alt="Your Company Logo" style="width: 70px; height: auto;">
                <h2 style="margin-left: 20px;">Haidri Beverages Private Limited</h2>
            </div>
                <hr>
                <div class="job-details">
                    <h3>Job Title: ${post.jobTitle}</h3>
                    <p><strong>Job Type:</strong> ${post.jobType}</p>
                    <p><strong>Job Location:</strong> ${post.jobLocation}</p>
                    <p><strong>Description:</strong> ${post.description}</p>
                    <p><strong>Experience Level:</strong> ${
                      post.experienceLevel
                    }</p>
                    <p><strong>Submission Deadline:</strong> ${formatCreatedAt(
                      post.submissionDeadline
                    )}</p>
                    <p><strong>Department:</strong> ${post.department}</p>
                    <!-- You can include more details here as needed -->
                    <p style="background-color: #4caf50; color: white; padding: 10px; text-align: center; border-radius: 5px;">
<div style="width: 50%; margin: auto;">
    <a href="http://localhost:3000/jobdetails?postid=${
      post._id
    }" style="color: white; text-decoration: none; display: block; padding: 10px; background-color: #4caf50; text-align: center; border-radius: 5px;">
        Please apply now
    </a>
</div>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
};

export default sendEmailToAllUsers;
