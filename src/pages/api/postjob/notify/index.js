import sendEmailToAllUsers from "mongodb/sendnotification_to_users";

export default async function handler(req, res) {
  try {
    switch (req.method.toLowerCase()) {
      case "post": {
        const { _id } = req.query;
        sendEmailToAllUsers(_id);
        return res.status(201).json({ message: "Notification sent successfully" });
      }
     
      default:
        return res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.error(error);

    // Handle specific errors and provide appropriate responses
    if (error) {
      return res.status(400).json({ error: "Bad Request" });
    }

    // Handle other unexpected errors with a generic response
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
