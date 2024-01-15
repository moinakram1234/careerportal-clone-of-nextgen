import { deletePost, updateJobPostAndAppStatus } from "prisma/archieved";

export default async function handler(req, res) {
  // Check if the request is a PATCH request
  if (req.method.toLowerCase() === "patch") {
    const { id } = req.query;
    try {
      console.log(id);
      const updatedJobPost = await updateJobPostAndAppStatus(id);

      res.status(200).json(updatedJobPost);
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method.toLowerCase() === "delete") {
    const { id } = req.query;
    await deletePost(id);
    return res.status(200).json({ message: "Job post deleted successfully" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
