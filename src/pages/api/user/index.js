import jwt from "jsonwebtoken";
import crypto from "crypto";
import { downloadAllUsers, getAllUsers, getUserByUsernameAndPassword } from "../mongodb/user";

// Generate secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

export default async function handler(req, res) {
  try {
    switch (req.method.toLowerCase()) {
      case "post": {
        const { email, userPassword } = req.body;

        // Validate username and password (add your validation logic here)

        const user = await getUserByUsernameAndPassword(email, userPassword);

        if (user && user._id) {
      const expiresIn = 3600 * 24;
          // User authentication successful, create a JWT token
          const token = jwt.sign(
            { userId: user._id, email: user.email, isadmin: user.isAdmin, phone:user.Phone, CNIC:user.CNIC },
            generateSecretKey(),
            { expiresIn }
          );
          return res.status(200).json({ token });
        } else {
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }
      }
      case "get":
        {
          const page = req.query.page;
          console.log(page)
          const limit = 10;
       if(page=="download")
       {
        const users = await downloadAllUsers(
         
        );
        return res.status(200).json(users
        );
      }
      else{
        const users = await getAllUsers( page,
          limit);
        return res.status(200).json(users);
      }
      }
      // Add other cases as needed for different endpoints
      default:
        return res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    // Handle errors
    console.error("Error in user authentication:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
