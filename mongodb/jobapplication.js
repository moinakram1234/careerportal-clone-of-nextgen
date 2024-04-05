// prisma/jobapplication.js

import connectDB from './db';
import { getSpecificPosts } from './jobpost';
import { JobApplication } from './schema';

connectDB();

export const createJobApplication = async (formData) => {
  try {
    const {
      fullName,
      phone,
      email,
      qualification,
      address,
      cv,
      selectedDepartment,
      postid,
      experience,
      experiencerange,
      countryorregion,
      city,
      stateorprovince,
      zipcode,
    } = formData;

    const appExist = await JobApplication.findOne({
      email: email,
    });

    if (appExist) {
      return { message: 'Application already submitted' };
    }

    await JobApplication.create({
      fullName,
      phone,
      email,
      qualification,
      address,
      cv,
      selectedDepartment,
      postid,
      experience,
      experiencerange: experiencerange.split(',').map(Number),
      countryorregion,
      city,
      stateorprovince,
      zipcode,
    });

    return { message: 'Application submitted successfully' };
  } catch (error) {
    console.error('Error creating job application:', error);
    throw error;
  }
};

export const getJobApplication = async () => {
  try {
    const getAllApplications = await JobApplication.find().sort({ createdAt: 'desc' });

    const applicationsWithJobPostData = await Promise.all(
      getAllApplications.map(async (application) => {
        const postid = application.postid;
        const jobpostApp = await getSpecificPosts(postid);
        return { ...application.toObject(), jobpostApp }; // Convert to object to ensure proper merging
      })
    );
  

    return applicationsWithJobPostData;
  } catch (error) {
    console.error('Error fetching job applications:', error);
    throw error;
  }
};

export const deleteApplication = async (_id) => {
  try {
    const jobApplicationData = await JobApplication.findByIdAndDelete(_id);

    return jobApplicationData;
  } catch (error) {
    console.error('Error deleting job application:', error);
    throw error;
  }
};