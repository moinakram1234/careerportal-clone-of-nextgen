import { accept_select_APP_nextgenAndAppStatus } from "../../mongodb/reject_or_accept_app";


export default async function handler
(req, res) {
  // Check if the request is a PATCH request
  if (req.method.toLowerCase() === "post") {
    const { _id, email } = req.body;
    try {
    //  await Reject_APP_JobPostAndAppStatus(_id,email);
await accept_select_APP_nextgenAndAppStatus(_id);
      res.status(200).json("Application Accepted successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method.toLowerCase() === "delete") {
    const { _id } = req.query;
    await deletePost(_id);
    return res.status(200).json({ message: "Job post deleted successfully" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}