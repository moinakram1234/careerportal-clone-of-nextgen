// pages/api/signup.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from './db';
import { User } from './schema';

connectDB();



export const createUser = async ({ email, userPassword }) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return { message: 'User already exists' };
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Create a new user
    const newUser = await User.create({
      email,
      userPassword: hashedPassword,
      isAdmin: false,
      createdAt: new Date(),
    });

    return {
      message: 'User created successfully',
      user: {
        id: newUser._id,
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



export const getUserByUsernameAndPassword = async (email, userPassword) => {
  try {
    const users = await User.find({ email });

    if (!users || users.length === 0) {
   return ;
    }

    const passwordMatch = await bcrypt.compare(userPassword, users[0].userPassword);

    if (passwordMatch) {
      return users[0];
    } else {
      throw new Error('Invalid password');
    }
  } catch (error) {
    console.error('Error in getUserByUsernameAndPassword:', error.message);
    throw error;
  }
};


export async function changePassword(email, newPassword) {
  try {
    // Perform validation and update the password in the database
    // This is a placeholder; replace it with your actual logic
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    // Update the user's password in the database
    await User.updateOne({ email }, { userPassword: hashedPassword });

    return { success: true, message: 'Password changed successfully' };
  } catch (error) {
    console.error('Error changing password:', error);
    throw error; // Handle or log the error appropriately in your application
  }
}
