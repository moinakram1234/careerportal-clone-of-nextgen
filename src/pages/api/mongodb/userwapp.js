import connectDB from './db';
import { FormData, User } from './schema';
connectDB();

export const getUsersWithoutApplications = async () => {
    try {
      // Fetch user emails from applications
      const userEmailsWithApplications = await FormData.distinct('user_email');
  
      // Fetch users who do not have an email in the userEmailsWithApplications list
      const usersWithoutApplications = await User.find({
        email: { $nin: userEmailsWithApplications }
      });
  
      // Calculate the total number of users without applications
      const totalUsersWithoutApplications = usersWithoutApplications.length;
  
      // Return the data of users without applications along with the total count
      return {
        total: totalUsersWithoutApplications,
        users: usersWithoutApplications
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
