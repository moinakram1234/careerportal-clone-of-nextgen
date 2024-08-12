import  connectDB from "./db";
import { FormData, User } from "./schema";

// Establish the database connection

connectDB();

export const downloadAllApp = async () => {
  try {
    
    // Fetch data from FormData schema
    const formDatas = await FormData.find({});
    return formDatas;
  } catch (error) {
    console.error("Error fetching job posts:", error);
    throw error;
  }
};

export const getAllApp = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const formDatas = await FormData.find({})
      .skip(skip)
      .limit(limit);

    const totalDocuments = await FormData.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    return {
      data: formDatas, // Ensure this is an array
      page,
      limit,
      totalPages,
      totalDocuments,
    };
  } catch (error) {
    console.error("Error fetching job posts:", error);
    throw error;
  }
};

export const graphAllApp = async () => {
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(`${currentYear}-01-01T00:00:00Z`);
  const endOfYear = new Date(`${currentYear + 1}-01-01T00:00:00.000Z`); // Ensure correct format

  try {
    const documents = await FormData.find({
      createdAt: {
        $gte: startOfYear,
        $lt: endOfYear
      }
    })
    .select('createdAt') // Only include the createdAt field
    .exec(); // Use exec() to execute the query

    return documents;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw new Error('Failed to fetch data');
  }
};