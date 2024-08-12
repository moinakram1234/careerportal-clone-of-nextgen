import connectDB  from "./db";
import { FormData } from "./schema";

connectDB();

export const Received_select_APP_nextgenAndAppStatus = async (_id, status, res) => {
  try {
    
    console.log(_id);
    const selected_app = await FormData.findOne({ _id });
    console.log(selected_app.personalInfo.name);
    if (!selected_app) {
      throw new Error("User not found");
    }

    const jobApp = await FormData.updateOne({ _id }, { appstatus: status });
       console.log(jobApp)
    if (jobApp.nModified === 0) {
      // Checking if any document was modified
      return res
        .status(404)
        .json({ error: "Job Application not found or already rejected" });
    }
   
    return jobApp;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  } 
};


