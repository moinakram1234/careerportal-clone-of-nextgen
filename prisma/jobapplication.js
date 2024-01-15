// prisma/jobapplication.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { getSpecificPosts } from "./jobpost";
export const createJobApplication = async (formData) => {
  try {
    const {
      fullName,
      phone,
      email,
      qualification,
      address,
      cv,
      selectedDepartment,
      postid,
    } = formData;

    const appExist = await prisma.jobApplication.findUnique({
      where: {
        email: email,
      },
    });

    if (appExist) {
      return { message: "Application already submitted" };
    }

    // Note: You may need to adjust this based on your actual Prisma model
    await prisma.jobApplication.create({
      data: {
        fullName,
        phone,
        email,
        qualification,
        address,
        cv,
        selectedDepartment,
        postid,
      },
    });

    return { message: "Application submitted successfully" };
  } catch (error) {
    console.error("Error creating job application:", error);
    throw error;
  }
};

export const getJobApplication = async () => {
  try {
    // Note: You may need to adjust this based on your actual Prisma model
    const getAllApplications = await prisma.jobApplication.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Fetch job post data for each application
    const applicationsWithJobPostData = await Promise.all(
      getAllApplications.map(async (application) => {
        const postid = application.postid;
        const jobpostApp = await getSpecificPosts(postid);
        return { ...application, jobpostApp };
      })
    );

    return applicationsWithJobPostData;
  } catch (error) {
    console.error("Error fetching job applications:", error);
    throw error;
  }
};

// export const getJobApplicationbyid = async (id) => {
//   try {
//     // Note: You may need to adjust this based on your actual Prisma model
//     const getAllApplicationsbyid = await prisma.jobApplication.findUnique({
//       where: {
//         id: id,
//       },
//     });

//     return getAllApplicationsbyid;
//   } catch (error) {
//     console.error("Error fetching job applications:", error);
//     throw error;
//   }
// };

export const deleteApplication = async (id) => {
  const jobApplicationData = await prisma.jobApplication.delete({
    where: {
      id: id,
    },
  });

  return jobApplicationData;
};
