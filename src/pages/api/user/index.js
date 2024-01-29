// import { createUser } from "prisma/user";
  // case "post": {
        //   const { userName, userPassword, userRole} = req.body;
        //   console.log(userName,userPassword,userRole)
        //   const new_post = await createUser({userName, userPassword,userRole});
        //   return res.status(201).json(new_post);
        // }
        import jwt from "jsonwebtoken";
        import crypto from 'crypto';
import { getUserByUsernameAndPassword } from "mongodb/user";

        
        // Generate secret key
        const generateSecretKey = () => {
          return crypto.randomBytes(32).toString('hex');
        };
        
        export default async function handler(req, res) {
          try {
            switch (req.method.toLowerCase()) {
              case "post": {
                const { email, userPassword } = req.body;
                
                // Validate username and password (add your validation logic here)
                
        
                const user = await getUserByUsernameAndPassword(email, userPassword);
              
                if (user && user._id) {
                
                  const expiresIn = 3600*12; // 1 hour in seconds
                  // User authentication successful, create a JWT token
                  const token = jwt.sign(
                    { userId: user._id, email: user.email, isadmin: user.isAdmin },
                    generateSecretKey(),
                    { expiresIn }
                  );
                  return res.status(200).json({ token });
                } else {
                  return res.status(401).json({ error: "Invalid username or password" });
                }
              }
              // Add other cases as needed for different endpoints
              default:
                return res.status(405).end(); // Method Not Allowed
            }
          } catch (error) {
            // Handle errors
            console.error("Error in user authentication:", error);
            return res.status(500).json({ error: "Internal Server Error" });
          }
        }
        