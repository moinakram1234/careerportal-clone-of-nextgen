import fs from "fs";
import path from "path";
import { createJobApplication, deleteApplication, getJobApplication } from "prisma/jobapplication";
import cloudinary from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method.toLowerCase() === "post") {
      // Use multer to handle file upload
      upload.single('pdfFile')(req, res, async function (err) {
        if (err) {
          console.error("Error uploading file:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const {
          fullName,
          phone,
          email,
          qualification,
          selectedDepartment,
          address,
        } = req.body;

        // Access the uploaded file in memory
        const cvBuffer = req.file.buffer;

        // Convert the buffer to a readable stream
        const cvStream = streamifier.createReadStream(cvBuffer);

        // Upload the file to Cloudinary
        const cloudinaryUploadResponse = await cloudinary.v2.uploader.upload_stream(
          { resource_type: "raw", timeout: 60000 }, // Increase the timeout to 60 seconds
          async (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              return res.status(500).json({ error: "Internal Server Error" });
            }
        
            // Pass the Cloudinary file URL to the createJobApplication function
            const newApplication = await createJobApplication({
              fullName,
              phone,
              email,
              qualification,
              selectedDepartment,
              cv: result.secure_url, // Use the secure URL from Cloudinary
              address,
            });
        
            return res.status(201).json(newApplication);
          }
        );
        

        cvStream.pipe(cloudinaryUploadResponse);
      });
    } else if (req.method.toLowerCase() === "get") {
      const fetchAllApplications = await getJobApplication();
      return res.status(200).json(fetchAllApplications);
    } else if (req.method.toLowerCase() === "delete") {
      const { id } = req.query;
      await deleteApplication(id);
      return res.status(200).json({ message: "Job post deleted successfully" });
    } else {
      return res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
