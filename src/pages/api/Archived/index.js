import { deletePost, updateJobPostAndAppStatus } from "mongodb/archieved";


export default async function handler(req, res) {
  // Check if the request is a PATCH request
  if (req.method.toLowerCase() === "patch") {
    const { _id } = req.query;
    try {
     
      const updatedJobPost = await updateJobPostAndAppStatus(_id);

      res.status(200).json(updatedJobPost);
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
