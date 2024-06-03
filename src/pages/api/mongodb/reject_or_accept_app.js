import connectDB from "./db";
import { JobApplication } from "./schema";

export const Reject_APP_JobPostAndAppStatus = async (_id, email, res) => {
  try {
    await connectDB(); // Assuming connectDB is asynchronous
    const selected_app = await JobApplication.findOne({ email });
    if (!selected_app) {
        throw new Error('User not found');
      }

    const jobApp = await JobApplication.updateOne({ email }, { ApprovalStatus: "rejected" });
    console.log(selected_app);
    console.log(jobApp);
    
    if (jobApp.nModified === 0) { // Checking if any document was modified
      return res.status(404).json({ error: "Job Application not found or already rejected" });
    }

    return jobApp;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};


export const Reject_select_APP_JobPostAndAppStatus = async (_id, res) => {
  try {
    await connectDB(); // Assuming connectDB is asynchronous
    const selected_app = await JobApplication.findOne({ _id });
    console.log(selected_app);
    if (!selected_app) {
        throw new Error('User not found');
      }

    const jobApp = await JobApplication.updateOne({ _id }, { ApprovalStatus: "rejected" });
    console.log(selected_app);
    console.log(jobApp);
    
    if (jobApp.nModified === 0) { // Checking if any document was modified
      return res.status(404).json({ error: "Job Application not found or already rejected" });
    }

    return jobApp;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

export const create_accepted_applicant_status = async (_id, email, res) => {
  try {
    await connectDB(); // Assuming connectDB is asynchronous
    const selected_app = await JobApplication.findOne({ email });
    console.log(email,_id);
    if (!selected_app) {
        throw new Error('User not found');
      }

    const jobApp = await JobApplication.updateOne({ email }, { ApprovalStatus: "accepted" });
    console.log(selected_app);
    console.log(jobApp);
    
    if (jobApp.nModified === 0) { // Checking if any document was modified
      return res.status(404).json({ error: "Job Application not found or already rejected" });
    }

    return jobApp;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};
