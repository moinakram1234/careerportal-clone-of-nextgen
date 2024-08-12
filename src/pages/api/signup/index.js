import { createUser } from "../mongodb/user";

// pages/api/signup.js
export default async function handler(req, res) {
  try {
    if (req.method.toLowerCase() === 'post') {
      const { email, cnic, phone } = req.body;
      console.log(req.body);
      // Example: Creating a new user in the database
      const response = await createUser({ email, cnic, phone });

      // Customize the response based on your needs
  if (response.error) {
  if (response.error === 'duplication') {
    return res.status(409).json(response); // Conflict
  } else {
    return res.status(400).json(response); // Bad Request for other errors
  }
} else {
  return res.status(200).json(response); // OK for successful response
}}
// Assuming the method check is done before this block, so it's not repeated here.
  } catch (error) {
    // Handle errors
    console.error('Error in user signup:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}