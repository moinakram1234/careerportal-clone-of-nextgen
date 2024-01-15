import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deletePost = async (id) => {
    try {
      const jobPostData = await prisma.jobPost.delete({
        where: {
          id: id,
        }
      });
  
       await prisma.jobApplication.deleteMany({
        where: {
          postid: id,
        }
      });
      return jobPostData;
    } catch (error) {
      console.error("Error deleting a job post:", error);
      throw error;
    }
  };
  
//retore
export const updateJobPostAndAppStatus = async (id) => {
    try {
      const jobPostData = await prisma.jobPost.update({
        where: {
          id: id,
        },
        data: {
          status: "restore",
        },
      });
  
      // Update application status (new feature)
      await prisma.jobApplication.updateMany({
        where: {
          postid: id,
        },
        data: {
          status: "restore",
        },
      });
  
      return jobPostData;
    } catch (error) {
      console.error("Error restoring a job post:", error);
      throw error;
    }
  };