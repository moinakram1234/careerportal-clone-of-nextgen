// pages/api/changepassword.js

import { changePassword } from "../mongodb/user";


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, newPassword } = req.body;

  const result = await changePassword(email, newPassword);

  if (result.success) {
    return res.status(200).json({ message: result.message });
  } else {
    return res.status(404).json({ error: result.error });
  }
}
