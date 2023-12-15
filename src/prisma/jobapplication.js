// prisma/jobapplication.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createJobApplication = async (formData) => {
  try {
    const { fullName, phone, email, qualification, address, cv, selectedDepartment } = formData;

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
    console.error('Error creating job application:', error);
    throw error;
  }
};


export const getJobApplication = async (formData) => {
  try {

    // Note: You may need to adjust this based on your actual Prisma model
    const getAllApplications = await prisma.jobApplication.findMany({
      orderBy: {
        createdAt: 'desc', // Use 'desc' instead of { sort: 'Desc' }
      },
    });
    return getAllApplications;
  } catch (error) {
    console.error('Error creating job application:', error);
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