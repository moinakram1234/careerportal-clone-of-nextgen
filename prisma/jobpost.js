import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createJobPost = async (
  jobTitle,
  jobType,
  jobLocation,
  description
) => {
  try {
    const jobPostData = await prisma.jobPost.create({
      data: {
        jobtitle: jobTitle,
        jobtype: jobType,
        joblocation: jobLocation, // Include joblocation in the data object
        description: description,
      },
    });

    return jobPostData;
  } catch (error) {
    console.error("Error creating a job post:", error);
    throw error;
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client
  }
};

export const getAllPosts = async () => {
  try {
    const jobPosts = await prisma.jobPost.findMany();
    return jobPosts;
  } catch (error) {
    console.error("Error fetching job posts:", error);
    return []; // Return an empty array or another default value
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client
  }
};

export const getPostById = async (id) => {
  try {
    const jobPost = await prisma.jobPost.findUnique({
      where: {
        id: id,
      },
    });
    return jobPost;
  } catch (error) {
    console.error("Error fetching job post:", error);
    return null; // Return null or another default value
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client
  }
};

export const getSpecificPosts = async (id) => {
  try {
    const jobPosts = await prisma.jobPost.findMany({
      where: {
        id: id,
      },
    });
    return jobPosts;
  } catch (error) {
    console.error("Error fetching job posts:", error);
    throw error;
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client
  }
};

export const deletePost = async (id) => {
  try {
    const jobPostData = await prisma.jobPost.update({
      where: {
        id: id,
      },
      data: {
        status: "deleted",
      },
    });

    // Update application status (new feature)
    await prisma.jobApplication.updateMany({
      where: {
        postid: id,
      },
      data: {
        status: "deleted",
      },
    });

    return jobPostData;
  } catch (error) {
    console.error("Error deleting a job post:", error);
    throw error;
  }
};

export const updatePost = async (
  id,
  jobTitle,
  jobType,
  jobLocation,
  description
) => {
  try {
    const jobPostData = await prisma.jobPost.update({
      where: { id: id },
      data: {
        jobtitle: jobTitle,
        jobtype: jobType,
        joblocation: jobLocation,
        description: description,
      },
    });

    return jobPostData;
  } catch (error) {
    console.error("Error updating a job post:", error);
    throw error;
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client
  }
};

export const updateEnableStatus = async (id, enable) => {
  try {
    // Update the enable status for the specified JobPost
    await prisma.jobPost.update({
      where: { id: id },
      data: { enable },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating enable status:", error);
    throw error; // Rethrow the error to be caught by the calling function
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
};
