import { createUser } from "mongodb/user";

// pages/api/signup.js
export default async function handler(req, res) {
  try {
    if (req.method.toLowerCase() === 'post') {
      const { email, userPassword } = req.body;

      // Example: Creating a new user in the database
      const response = await createUser({ email, userPassword });

      // Customize the response based on your needs
      return res.status(200).json(response);
    } else {
      return res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    // Handle errors
    console.error('Error in user signup:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}