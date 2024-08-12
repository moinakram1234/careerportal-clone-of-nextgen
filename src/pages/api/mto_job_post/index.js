import {
    getAllPosts,
    getAllPosts_mto,
  } from "../mongodb/jobpost";
  
  export default async function handler(req, res) {
    try {
      switch (req.method.toLowerCase()) {
    
        case "get": {       
            
            const jobpostData = await getAllPosts_mto();
            return res.status(200).json(jobpostData);
          
        }
        default:
          return res.status(405).end(); // Method Not Allowed
      }
    } catch (error) {
      console.error(error);
  
      // Handle specific errors and provide appropriate responses
      if (error) {
        return res.status(400).json({ error: "Bad Request" });
      }
  
      // Handle other unexpected errors with a generic response
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  