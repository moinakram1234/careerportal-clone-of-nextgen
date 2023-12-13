import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export const createJobPost = async (jobTitle, jobType, joblocation, description) => {
  const jobpostData = await prisma.jobPost.create({
    data: {
      jobtitle: jobTitle,
      jobtype: jobType,
      joblocation: joblocation, // Include joblocation in the data object
      description: description,
    },
  });

  return jobpostData;
};

export const getAllPosts = async () => {
  const jobPosts = await prisma.jobPost.findMany();
  return jobPosts;
};

export const deletePost = async (id) => {
  const jobPostData = await prisma.jobPost.delete({
    where: {
      id: id,
    },
  });

  return jobPostData;
};

export const updatePost = async (id, jobTitle, jobType, jobLocation, description) => {
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
};
