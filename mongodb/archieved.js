// archieved.js
import db from "mongodb/db";
import { JobPost, JobApplication } from "./schema";
db();

export const deletePost = async (_id) => {
  try {
    const jobPostData = await JobPost.deleteOne({
      _id: _id, // Corrected from delete to deleteOne
    });

    await JobApplication.deleteMany({
      postid: _id, // Corrected from id to _id
    });

    return jobPostData;
  } catch (error) {
    console.error("Error deleting a job post:", error);
    throw error;
  }
};

// restore.js
export const updateJobPostAndAppStatus = async (id) => {
  try {
    console.log(id); // Debug logs
    const jobPostData = await JobPost.updateOne(
      {
        _id: id, // Corrected from where to just _id
      },
      {
        $set: { status: "restore" }, // Using $set to update the status
      }
    );

    // Update application status (new feature)
    await JobApplication.updateMany(
      {
        postid: id, // Corrected from _id to id
      },
      {
        $set: { status: "restore" }, // Using $set to update the status
      }
    );

    return jobPostData;
  } catch (error) {
    console.error("Error restoring a job post:", error);
    throw error;
  }
};
