// // pages/api/nextgensubmission.js

// import { FormData, createnextgenappform, getUserByEmail } from "../mongodb/nextgen";

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       const { Useremail, accessibility, personalInfo, education, internshipPreference, hasWorkExperience, workExperience } = req.body;
//       console.log(education)
//       const result = await createnextgenappform({
//         Useremail,
//         accessibility,
//         personalInfo,
//         education,
//         internshipPreference,
//         hasWorkExperience,
//         workExperience,
//       });

//       res.status(201).json({ message: result });
//     } catch (error) {
//       res.status(500).json({ error: 'Error saving form data to database', message: error.message });
//     }
//   } else if (req.method === 'GET') {
//     try {
//       const { email } = req.query;

//      const formData = await  getUserByEmail(email)

//       if (formData) {
//         res.status(200).json({ exists: true });
//       } else {
//         res.status(200).json({ exists: false });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Error checking form submission', message: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST', 'GET']);
//     res.status(405).json({ message: `Method ${req.method} Not Allowed` });
//   }
// }
import multer from "multer";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import {
  FormData,
  createnextgenappform,
  getUserByEmail,
} from "../mongodb/nextgen";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.random();

    cb(null,  uniqueSuffix+ "-" +file.originalname);
  },
});

const upload = multer({ storage });

const uploadMiddleware = upload.single("file");

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await runMiddleware(req, res, uploadMiddleware);

      const data = JSON.parse(req.body.data);

      const {
        Useremail,
        accessibility,
        personalInfo,
        education,
        internshipPreference,
        hasWorkExperience,
        workExperience,
        postid
      } = data;

      const filePath = req.file ? req.file.path : null;

      const result = await createnextgenappform({
        Useremail,
        accessibility,
        personalInfo,
        education,
        internshipPreference,
        hasWorkExperience,
        workExperience,
        postid,
        cv: filePath,
      });
      res.status(201).json({ message: result });
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Error saving form data to database",
          message: error.message,
        });
    }
  } else if (req.method === "GET") {
    try {
      const { email } = req.query;

      const formData = await getUserByEmail(email);

      if (formData) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Error checking form submission",
          message: error.message,
        });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
