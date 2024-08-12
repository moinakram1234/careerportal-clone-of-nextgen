// controller.js
import connectDB from "./db";
import { JobPost, JobApplication } from "./schema";

connectDB();

export const createJobPost = async (
  jobTitle,
  jobType,
  jobLocation,
  description,
  experienceLevel,
  submissionDeadline,
  department,
  values
) => {
  try {
    const jobPostData = await JobPost.create({
      jobTitle,
      jobType,
      jobLocation,
      description,
      experienceLevel: experienceLevel.value,
      submissionDeadline,
      department: department.value,
      values
    });

    return jobPostData;
  } catch (error) {
    console.error("Error creating a job post:", error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const jobPosts = await JobPost.find();
    return jobPosts;
  } catch (error) {
    console.error("Error fetching job posts:", error);
    throw error;
  }
};
export const getAllPosts_mto = async () => {
  try {
    const jobPosts = await JobPost.find();
    const mtoPosts = jobPosts.filter(post => post.experienceLevel.includes("mto"));
    const mtoPostsData = mtoPosts.map(post => ({ jobTitle: post.jobTitle, _id: post._id }));
    return mtoPostsData;
  } catch (error) {
    console.error("Error fetching job posts:", error);
    throw error;
  }
};


export const getPostById = async (id) => {
  try {
    const jobPostdata = await JobPost.findOne({ _id: id });
    return jobPostdata;
  } catch (error) {
    console.error("Error fetching job post:", error);
    throw error;
  }
};

export const getSpecificPosts = async (id) => {
  try {
    const jobPosts = await JobPost.find({ _id: id });
    return jobPosts;
  } catch (error) {
    console.error("Error fetching job posts:", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    console.log(id);
    const jobPostData = await JobPost.findOneAndUpdate(
      { _id: id },
      { $set: { status: "deleted" } },
      { new: true }
    );

    if (!jobPostData) {
      console.error("Job post not found");
      return null;
    }

    await JobApplication.updateMany(
      { postid: id },
      { $set: { status: "deleted" } }
    );

    return jobPostData;
  } catch (error) {
    console.error("Error deleting a job post:", error);
    throw error;
  }
};

export const updatePost = async (
  _id,
  jobTitle,
  jobType,
  jobLocation,
  description,
  department,
  submissionDeadline,
  experienceLevel,
  values,
) => {
  try {
    const jobPostData = await JobPost.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          jobTitle,
          jobType,
          jobLocation,
          description,
          department: department.value,
          submissionDeadline,
          experienceLevel: experienceLevel.value,
          values,
        },
      },
      { new: true }
    );

    if (!jobPostData) {
      console.error("Job post not found");
      return null;
    }

    return jobPostData;
  } catch (error) {
    console.error("Error updating a job post:", error);
    throw error;
  }
};

export const updateEnableStatus = async (id, enable) => {
  try {
    console.log(id, enable);
    const jobPostData = await JobPost.findOneAndUpdate(
      { _id: id },
      { $set: { enable } },
      { new: true }
    );

    if (!jobPostData) {
      console.error("Job post not found");
      return null;
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating enable status:", error);
    throw error;
  }
};
