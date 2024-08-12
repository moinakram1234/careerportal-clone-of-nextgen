import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import connectDB from "./db";
import { User } from "./schema";

connectDB();

const generateRandomPassword = (length = 8) => {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
};

const sendPasswordEmail = async (email, plainPassword) => {
  try {
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
      to: email,
      subject: "Your Account Password",
      html: `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Haidri Beverages Talent Acquisition<</title>
<style>
      p {
            font-size: 18px; /* Sets a specific font size for the paragraph */
        }
</style>
  </head>
  <body>
    <table width="100%" bgcolor="#F7F7F7" style="font-family: Arial, sans-serif; height: 100vh;">
      <tr>
        <td  >
          <table bgcolor="#ffffff" style=" height: 100vh; width: 100%; border: 2px solid #ddd; padding: 2px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <tr>
              <td align="center">
                <img src="https://res.cloudinary.com/dammqml1x/image/upload/v1720764949/nhbacytvtthhw2k5wzdd.png" alt="Logo" style="width: 200px; height:auto; ">
               
              </td>
            </tr>
      
            <tr> <div
            style="height: 5px; border-radius: 10px; background-color: green;"
          ></div>
          </tr>
    <tr style="">
              
   <td  bgcolor="#EAF1FB">
           <table align="center">
               <tr >
          <td align="center" style="padding-bottom: 0;">
           <img src="https://freeiconshop.com/wp-content/uploads/edd/mail-open-flat.png" alt="Logo" style="width: 70px; height: auto;">
        </td>
</tr>
<tr>
  <td align="center" style="padding-top: 0;">
    <h2 style="margin-top: 0;">Password to Login</h2>
  </td>
</tr>
           </table>
   </td>
     </tr>
            <tr style="padding-top: 0;">
              <td>
                <table width="100%">
                  <tr>
                    <td bgcolor="white" style="padding: 10px;">
                      <p style="font-weight: bold; font-size: 14px;">Dear Candidate,</p>
                      <p style="font-size: 14px;">
                        Thank you for registering in NextGen Leaders Program.
                      </p>
                      <p style="font-size: 14px;">
                        Your password to log into your account is: <strong>${plainPassword}</strong>
                      </p>
                      <p style="font-size: 14px;">
                        <strong>Important note:</strong> Please fill out the required information correctly.
                      </p>
                      <p style="font-size: 14px;">Best Regards,</p>
                      <p style="font-size: 14px;">The Talent Acquisition Team</p>
                      <p style="font-size: 14px;">
                        <span style="font-weight: bold; font-size: 14px;">Disclaimer:</span> If you did not applied for <span style="color: green;">NextGen Leaders Program</span>, please ignore this message.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    </body>
</html>
  `,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

export const AdminupdatePassword = async (email,newPassword) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const userPassword = newPassword;
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      existingUser.userPassword = hashedPassword;
      await existingUser.save();
      await sendPasswordEmail(email, userPassword);
      return { message: "Password updated successfully", user: existingUser, plainPassword: userPassword };
    }
    else {
      return { message: "User does not exist" };
    }
  } catch (error) {
    console.error("Error in updatePassword:", error);
    throw error;
  }
};
export const updatePassword = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const userPassword = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      existingUser.userPassword = hashedPassword;
      await existingUser.save();
      await sendPasswordEmail(email, userPassword);
      return { message: "Password updated successfully", user: existingUser, plainPassword: userPassword };
    }
    else {
      return { message: "User does not exist" };
    }
  } catch (error) {
    console.error("Error in updatePassword:", error);
    throw error;
  }
};
export const createUser = async ({ email, cnic, phone }) => {
  try {
    const message = "";
    console.log(email);
    const existingUser = await User.findOne({ email });
  
    if (existingUser) {
      const userPassword = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      existingUser.userPassword = hashedPassword;
      await existingUser.save();
      await sendPasswordEmail(email, userPassword);
      return { message: "Password updated successfully", user: existingUser, plainPassword: userPassword };
    }
    if (existingUser) {
      return { message: "User already exists", error: "duplication" };
    }
    const existingUserByPhone = await User.findOne({ Phone: phone });

    if (existingUserByPhone) {
      return {
        message: "Please register with another phone number",
        error: "duplication",
      };
    }

    const existingUserByCnic = await User.findOne({ CNIC: cnic });

    if (existingUserByCnic) {
      return { message: "Please change CNIC", error: "duplication" };
    }
    const userPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = await User.create({
      email,
      userPassword: hashedPassword,
      isAdmin: false,
      CNIC: cnic,
      Phone: phone,
      createdAt: new Date(),
    });

    await sendPasswordEmail(email, userPassword);

    return {
      message: "User created successfully",
      error: "",
      user: {
        id: newUser._id,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        createdAt: newUser.createdAt,
      },
      plainPassword: userPassword,
    };
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

export const getUserByUsernameAndPassword = async (email, userPassword) => {
  try {
    const users = await User.find({ email });

    if (!users || users.length === 0) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(
      userPassword,
      users[0].userPassword
    );

    if (passwordMatch) {
      return users[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in getUserByUsernameAndPassword:", error.message);
    throw error;
  }
};

export const downloadAllUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw error;
  }
};


export const getAllUsers = async (page = 1, limit = 10) => {
  try {
    console.log(page)
    const skip = (page - 1) * limit;
    const users = await User.find({}).skip(skip)
    .limit(limit);
    const totalDocuments = await User.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);
    return {
      data: users,
      page,
      limit,
      totalPages,
      totalDocuments,
    };
 
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw error;
  }
};