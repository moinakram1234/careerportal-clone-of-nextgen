import {
  createJobPost,
  getAllPosts,
  deletePost,
  updatePost,
} from "@/prisma/jobpost";
export default async function handler(req, res) {
  try {
    switch (req.method.toLowerCase()) {
      case "post": {
        const { jobtitle, jobtype, joblocation, description } = req.body;
        const new_post = await createJobPost(
          jobtitle,
          jobtype,
          joblocation,
          description
        );
        return res.status(201).json(new_post);
      }
      case "get": {
        const jobpostData = await getAllPosts();
        return res.status(200).json(jobpostData);
      }
      case "delete": {
        const { id } = req.query;
        await deletePost(id);
        return res
          .status(200)
          .json({ message: "Job post deleted successfully" });
      }
      case "put": {
        const { id, jobtitle, jobtype, joblocation, description } = req.body;
        await updatePost(id, jobtitle, jobtype, joblocation, description);
        return res
          .status(200)
          .json({ message: "Job post updated successfully" });
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
