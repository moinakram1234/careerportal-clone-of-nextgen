// pages/api/download-file.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Extract the 'path' parameter from the query string.
  const { path: filePath } = req.query;
  console.log(req.query); // Log the query parameters for debugging.

  // Check if the 'path' parameter is not provided.
  if (!filePath) {
    return res.status(400).end('File path not provided');
  }

  // Decode the URL-encoded path to get the actual file path.
  const decodedPath = decodeURIComponent(filePath);

  // Read the contents of the file.
  fs.readFile(decodedPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal Server Error');
    }

    // Determine the file's content type based on its extension.
    const fileExtension = path.extname(decodedPath).toLowerCase();
    let contentType = 'application/octet-stream'; // Default content type

    if (fileExtension === '.pdf') {
      contentType = 'application/pdf';
    } else if (fileExtension === '.png') {
      contentType = 'image/png';
    } else if (fileExtension === '.docx' || fileExtension === '.doc') {
      contentType = 'application/msword';
    } // Add more cases for other file types as needed

    // Set response headers for the file.
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', data.length);
    res.setHeader('Content-Disposition', `attachment; filename=${path.basename(decodedPath)}`);

    // Send the file data in the response.
    res.status(200).end(data);
  });
}
