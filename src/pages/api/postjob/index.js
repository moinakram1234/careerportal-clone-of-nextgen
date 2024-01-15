import { createJobPost, deletePost, getAllPosts, getPostById, updateEnableStatus, updatePost } from "prisma/jobpost";

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
        const { id } = req.query;
        console.log(id);
        if (id!==undefined) {
          // If the request includes an ID, fetch details for the specific job post
          const jobpostDetails = await getPostById(id);

          if (jobpostDetails) {
            return res.status(200).json(jobpostDetails);
          } else {
            return res.status(404).json({ error: "Job post not found" });
          }
        } else {
          // If no ID is provided, fetch all job posts
          const jobpostData = await getAllPosts();
          return res.status(200).json(jobpostData);
        }
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
      case "patch": {
        const { id } = req.query;
        const { enable } = req.body;
        
        // Assuming you have a function named updateEnableStatus in your prisma/jobpost
        await updateEnableStatus(id, enable);

        return res.status(200).json({ message: "Enable status updated successfully" });
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
