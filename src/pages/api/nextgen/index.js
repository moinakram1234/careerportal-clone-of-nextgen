import { downloadAllApp, getAllApp, graphAllApp } from "../mongodb/jobapplication";


export default async function handler(req, res) {
  // Connect to the database

  // Handle GET request
  if (req.method.toLowerCase() === "get") {
    try {
      const page = req.query.page;
      const limit = 10;
      if (page == "download") {
        // Fetch data from User schema
        const data = await downloadAllApp(page, limit);
        res.status(200).json(data);
        // Return the data
      } 
     else if (page == "graph") {
        // Fetch data from User schema
        const data = await graphAllApp();
        res.status(200).json(data);
        // Return the data
      }else {
        // Fetch data from User schema
        const data = await getAllApp(page, limit);
        res.status(200).json(data);
        // Return the data
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle other HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
