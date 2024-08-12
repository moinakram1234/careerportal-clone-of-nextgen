import { Reject_select_APP_JobPostAndAppStatus, Reject_select_APP_nextgenAndAppStatus } from "../../mongodb/reject_or_accept_app";

export default async function handler(req, res) {
  // Extract the request method
  const method = req.method.toLowerCase();

  if (method === "post") {
    const { _id, email } = req.body; // Extract data from request body

    try {
      console.log(_id);
      // Call the function to reject the application
      await Reject_select_APP_nextgenAndAppStatus(_id, email);
      res.status(200).json("Application rejected successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (method === "delete") {
    const { _id } = req.query; // Extract data from query parameters

    try {
      await deletePost(_id); // Call the function to delete the post
      return res.status(200).json({ message: "Job post deleted successfully" });
    } catch (error) {
      console.error("Error deleting job post:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
