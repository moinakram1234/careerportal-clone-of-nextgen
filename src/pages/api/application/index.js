import fs from "fs";
import path from "path";
import {
  createJobApplication,
  deleteApplication,
  deleteFile,
  getJobApplication,
} from "prisma/jobapplication";

const uploadFolder = path.join(process.cwd(), "uploads"); // Define your upload folder

// Ensure the upload folder exists
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

export default async function handler(req, res) {
  try {
    if (req.method.toLowerCase() === "post") {
      const {
        fullName,
        phone,
        email,
        qualification,
        selectedDepartment,
        cv,
        address,
      } = req.body;

      // Generate a unique filename based on the current timestamp and applicant's name.
      const fileName = `${Date.now()}_${fullName.replace(/\s+/g, "_")}.pdf`;

      // Construct the full file path by joining the upload folder and the generated filename.
      const filePath = path.join(uploadFolder, fileName);

      // Convert the base64-encoded PDF data to a Buffer.
      const pdfBuffer = Buffer.from(cv, "base64");

      // Write the PDF Buffer to the specified file path synchronously.
      fs.writeFileSync(filePath, pdfBuffer);

      // Pass the file path to the createJobApplication function
      const newApplication = await createJobApplication({
        fullName,
        phone,
        email,
        qualification,
        selectedDepartment,
        cv: filePath, // Store the file path instead of the Base64 URL
        address,
      });

      return res.status(201).json(newApplication);
    } else if (req.method.toLowerCase() === "get") {
      const fetchAllApplications = await getJobApplication();
      return res.status(200).json(fetchAllApplications);
    } 
    else if(req.method.toLowerCase() === "delete"){
        const { id,path } = req.query;
        const filePath=path
        console.log(filePath);
        await deleteFile(filePath);
        
         await deleteApplication(id);
        return res
          .status(200)
          .json({ message: "Job application deleted successfully" });
    }
    else {
      return res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
