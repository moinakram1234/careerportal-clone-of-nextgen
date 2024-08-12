// Import necessary modules and connectDB function

import connectDB from './db';
import { FormData } from './schema';

connectDB();

export const createnextgenappform = async (formData) => {
  try {
  

    // Transform the languages array to contain only strings
    if (formData.personalInfo && formData.personalInfo.languages) {
      formData.personalInfo.languages = formData.personalInfo.languages.map(lang => lang.value);
    }

    // Ensure Useremail is not undefined
    if (!formData.Useremail) {
      throw new Error("Useremail is missing");
    }

    console.log(formData.Useremail);

    // Check if user with the same email already exists
    const userExists = await getUserByEmail(formData.Useremail);
    if (userExists) {
      return ("Application already submitted.");
    }

    // Include Useremail explicitly
    const newFormData = new FormData({
      ...formData,
      user_email: formData.Useremail,
    });

    console.log("New FormData instance:", newFormData);

    const savedFormData = await newFormData.save();

    console.log("Saved form data:", savedFormData);

    return 'Form data saved successfully';
  } catch (error) {
    console.error('Error in createnextgenappform:', error);
    throw error;
  }
};

export const getUserByEmail = async (user_email) => {
  try {
    const user = await FormData.findOne({ user_email });
    return !!user; // Returns true if user exists, false otherwise
  } catch (error) {
    console.error('Error in getUserByEmail:', error.message);
    throw error;
  }
};

export const getUserByEmail_status_data = async (email) => {
  try {
    const formData = await FormData.findOne({ 'user_email': email });
    return formData; // Returns the document if found, null otherwise
  } catch (error) {
    console.error('Error in getUserByEmail:', error.message);
    throw error;
  }
};