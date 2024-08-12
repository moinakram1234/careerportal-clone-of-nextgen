import { Received_select_APP_nextgenAndAppStatus } from "../mongodb/receivedapp";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, newStatus } = req.body;

  if (!userId || !newStatus) {
    return res.status(400).json({ message: 'Missing userId or newStatus' });
  }

  try {
  await Received_select_APP_nextgenAndAppStatus(userId, newStatus)

    return res.status(200).json({ message: 'Status updated successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
