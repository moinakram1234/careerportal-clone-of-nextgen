import sendEmailToApplicant from "../../mongodb/email_to_reject_app";


export default async function handler(req, res) {
  try {
    const { message } = req.body;
    console.log(message)
    switch (req.method.toLowerCase()) {
      case "post": {
        
        console.log(message)
        sendEmailToApplicant(message);
        return res.status(200).json({ message: "sent email successfully" });
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
