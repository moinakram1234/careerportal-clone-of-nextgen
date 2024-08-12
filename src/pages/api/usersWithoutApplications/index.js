import { getUsersWithoutApplications } from "../mongodb/userwapp";

// pages/api/update-password.js
export default async function handler(req, res) {
  try {
    
    if (req.method.toLowerCase() === "get") {
      // Example: Creating a new user in the database
      const response = await getUsersWithoutApplications();

      // Customize the response based on your needs

      return res.status(200).json(response); // OK for successful response
    }
    // Assuming the method check is done before this block, so it's not repeated here.
  } catch (error) {
    // Handle errors
    console.error("Error in user signup:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
