import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export const createJobApplication = async ({ fullName, phone, email, qualification, selectedDepartment, cv, address }) => {
  return await prisma.jobApplication.create({
    data: {
      fullName,
      phone,  // Ensure `phone` is directly part of the `data` object
      email,
      qualification,
      selectedDepartment,
      cv,
      address,
    },
  });
};
