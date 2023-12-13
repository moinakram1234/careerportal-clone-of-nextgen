// pages/api/jobapplications.js

// pages/api/application/index.js

import { createJobApplication } from '@/prisma/jobapplication';

export default async function handler(req, res) {
  try {
    if (req.method.toLowerCase() === 'post') {
      const { fullName, phone, email, qualification, selectedDepartment, cv, address } = req.body;

      const newApplication = await createJobApplication({
        fullName,
        phone,
        email,
        qualification,
        selectedDepartment,
        cv,
        address,
      });

      return res.status(201).json(newApplication);
    }

    // Handle other HTTP methods if needed
    return res.status(405).end(); // Method Not Allowed
  } catch (error) {
    console.error(error);

    // Handle errors appropriately, provide an error response
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
