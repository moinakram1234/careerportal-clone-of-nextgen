// prisma/jobapplication.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import fs from "fs";
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
      },
    });

    return { message: "Application submitted successfully" };
  } catch (error) {
    console.error("Error creating job application:", error);
    throw error;
  }
};

export const getJobApplication = async (formData) => {
  try {
    // Note: You may need to adjust this based on your actual Prisma model
    const getAllApplications = await prisma.jobApplication.findMany({
      orderBy: {
        createdAt: "desc", // Use 'desc' instead of { sort: 'Desc' }
      },
    });
    return getAllApplications;
  } catch (error) {
    console.error("Error creating job application:", error);
    throw error;
  }
};

export const deleteApplication = async (id) => {
  const jobApplicationData = await prisma.jobApplication.delete({
    where: {
      id: id,
    },
  });

  return jobApplicationData;
};

export const deleteFile = async (filePath) => {
  try {
    // Check if the file exists before attempting to delete
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("File deleted successfully");
      return true; // Return true to indicate successful deletion
    } else {
      console.error("File not found");
      console.log(filePath)
      return false; // Return false to indicate file not found
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error; // Throw the error to indicate a failure
  }
};
