import connectDB from "./db";
import { FormData } from "./schema";

 connectDB();


 
export const accept_select_APP_nextgenAndAppStatus = async (_id, email, res) => {
  try {
    
    console.log(_id);
    const selected_app = await FormData.findOne({ _id });
    console.log(selected_app.personalInfo.name);
    if (!selected_app) {
      throw new Error("User not found");
    }

    const jobApp = await FormData.updateOne({ _id }, { appstatus: "accepted" });
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

export const Reject_select_APP_nextgenAndAppStatus = async (_id, email, res) => {
  try {
   
    console.log(_id);
    const selected_app = await FormData.findOne({ _id });
    console.log(selected_app.personalInfo.name);
    if (!selected_app) {
      throw new Error("User not found");
    }
     const jobApp = await FormData.updateOne({ _id }, { appstatus: "rejected"
    });
    console.log(selected_app);
     
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



export const create_accepted_applicant_status = async (_id, email, res) => {
  try {
    console.log(_id)
   
    const selected_app = await FormData.findOne({
      user_email: email });
    console.log(email, _id);
    if (!selected_app) {
      throw new Error("User not found");
    }

    const jobApp = await FormData.updateOne(
      { 
        user_email:email },
      { appstatus: "accepted" }
    );
    console.log(selected_app);
    console.log(jobApp);

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
