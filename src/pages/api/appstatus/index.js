// pages/api/appstatus.js

import { Query } from "mongoose";
import { getUserByEmail_status_data } from "../mongodb/nextgen";

export default async function handler(req, res) {
  const { email } = req.query;
  console.log(email)
  switch (req.method) {
    case 'GET':
      try {
        const formData = await getUserByEmail_status_data(email);
         console.log(formData)
        if (!formData) {
          return res.status(404).json({ success: false, message: 'FormData not found' });
        }

        res.status(200).json({ success: true, formData });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
