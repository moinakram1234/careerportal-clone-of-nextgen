// components/ApplicationPreview.js

import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaPhone, FaEnvelope, FaGraduationCap, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import { createJobapplication } from '@/server_requests/client_requests';

const ApplicationPreview = ({ formData, onEdit }) => {
    const handleSubmit = async () => {
        try {
          // Assuming formData is properly defined in your component state
          const newApplication = await createJobapplication(formData);
      
          // The job application was successfully created
          console.log('Job application created successfully:', newApplication);
      
          // You can use toast or any other notification library here
          // Example with the toast library
          toast.success('application Submited successfully');
        } catch (error) {
          console.error('Error creating job application:', error);
      
          // Handle errors appropriately, you might want to show an error message to the user
          // Example with the toast library
          toast.error('Error creating job application');
        }
      };
      
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Application Preview</h2>
      
      <div className="mb-4">
        <div className="flex items-center">
          <FaUser className="mr-2" />
          <strong>Full Name:</strong> {formData.fullName}
        </div>
        <hr className="my-2" />
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <FaPhone className="mr-2" />
          <strong>Phone:</strong> {formData.phone}
        </div>
        <hr className="my-2" />
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <FaEnvelope className="mr-2" />
          <strong>Email:</strong> {formData.email}
        </div>
        <hr className="my-2" />
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <FaGraduationCap className="mr-2" />
          <strong>Qualification:</strong> {formData.qualification}
        </div>
        <hr className="my-2" />
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <FaBuilding className="mr-2" />
          <strong>Selected Department:</strong> {formData.selecteddepartment}
        </div>
        <hr className="my-2" />
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <FaMapMarkerAlt className="mr-2" />
          <strong>Address:</strong> {formData.address}
        </div>
      </div>

      <button
        className="bg-blue-500 text-white py-2 px-4 mt-6 rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Edit Application
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 mt-6 rounded-md hover:bg-blue-600"
        onClick={onEdit}
      >
        back
      </button>
      <ToastContainer />
    </div>
  );
};

export default ApplicationPreview;

