// pages/api/signup.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();


export const createUser = async ({ email, userPassword }) => {
  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { message: 'User already exists' };
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email,
        userPassword: hashedPassword,
        isAdmin: false,
      },
    });

    return {
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        createdAt: newUser.createdAt,
      },
    };
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error; // Handle or log the error appropriately in your application
  }
};


// ... (existing code for getUserByUsernameAndPassword remains unchanged)

export const getUserByUsernameAndPassword = async (
    email,
    userPassword
  ) => {
    try {
        console.log(email)
      const users = await prisma.user.findMany({
        where: {
          email: email,
        },
      });
  
      if (!users || users.length === 0) {
        return ;
      }
  
      if (!users[0].userPassword) {
        return ;
      }
  
      if (!users[0].otp) {
        return ;
      }
      const passwordMatch = await bcrypt.compare(userPassword, users[0].userPassword);
    
      if (passwordMatch) {
        return users[0];
      } else {
        return;
      }
    } catch (error) {
      console.error('Error in getUserByUsernameAndPassword:', error);
      throw error; // Handle or log the error appropriately in your application
    }
  }

  //change password:
  
export async function changePassword(email, newPassword) {
  try {
    // Perform validation and update the password in the database
    // This is a placeholder; replace it with your actual logic
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Update the user's password in the database
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        userPassword: hashedPassword,
      },
    });

    return { success: true, message: 'Password changed successfully' };
  } catch (error) {
    console.error('Error changing password:', error);
    return { success: false, error: 'Internal Server Error' };
  }
}