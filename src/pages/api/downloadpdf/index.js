// pages/api/download-pdf.js

import fs from 'fs';

export default function handler(req, res) {
  // Extract the 'path' parameter from the query string.
  const { path: pdfPath } = req.query;
  console.log(req.query); // Log the query parameters for debugging.

  // Check if the 'path' parameter is not provided.
  if (!pdfPath) {
    return res.status(400).end('PDF path not provided');
  }

  // Decode the URL-encoded path to get the actual file path.
  const decodedPath = decodeURIComponent(pdfPath);

  // Read the contents of the PDF file.
  fs.readFile(decodedPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal Server Error');
    }

    // Set response headers for the PDF file.
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', data.length);
    res.setHeader('Content-Disposition', 'attachment; filename=file.pdf');

    // Send the PDF data in the response.
    res.status(200).end(data);
  });
}
