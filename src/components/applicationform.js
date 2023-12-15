import { createJobapplication } from "@/server_requests/client_requests";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ApplicationPreview from "./applicationpreview";

const ApplicationForm = () => {
  const [istoggle, setToggle] = useState(true);
  const [fileError, setFileError] = useState(""); // Track file error
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    qualification: "",
    selectedDepartment: "",
    cv: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prevData) => ({
        ...prevData,
        cv: file,
      }));
 
      // Display file details in an alert
      // const fileDetails = `Name: ${file.name}\nSize: ${file.size} bytes\nType: ${file.type}\nType: ${file.path}`;
      // alert(`Selected file:\n${fileDetails}`);
  
      setFileError(""); // Clear file error when a valid PDF is added
    } else {
      setFileError("Invalid file format. Please upload a PDF file.");
    }
  };
  

  const handlePreview = () => {
    setToggle(!istoggle);
  };

  //submit form Data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Submit the form data
    const response = await createJobapplication(formData);
    setFormData({
      fullName: "",
    phone: "",
    email: "",
    qualification: "",
    selectedDepartment: "",
    cv: "",
    address: "",
    })
    // Optionally, you can handle success or redirect the user
    toast(response.message);
  };
  return (
    <div>
      {istoggle && (
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <label htmlFor="fullName" className="block mb-2">
            Full Name:
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              required
            />
          </label>

          <label htmlFor="phone" className="block mb-2">
            Phone:
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              required
            />
          </label>

          <label htmlFor="email" className="block mb-2">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              required
            />
          </label>

          <label htmlFor="qualification" className="block mb-2">
            Qualification:
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              required
            />
          </label>

          <label htmlFor="selectedDepartment" className="block mb-2">
           Department:
            <input
              type="text"
              id="selectedDepartment"
              name="selectedDepartment"
              value={formData.selectedDepartment}
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              required
            />
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="border p-2 w-full mt-1"
            required
          />

          {fileError && (
            <p className="text-red-500 mt-2">{fileError}</p>
          )}
       
          <label htmlFor="address" className="block mb-2">
            Address:
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              required
            />
          </label>

          <button
            type="submit" // Add type attribute to make it a submit button
            className="bg-blue-500 text-white py-2 px-4 mt-6 rounded-md hover:bg-blue-600"
          >
            Submit Application
          </button>
        </form>
      )}

      {/* {!istoggle && (
        <ApplicationPreview
          formData={formData}
          onEdit={() => setToggle(true)}
        />
      )} */}
      <ToastContainer/>
    </div>
  );
};

export default ApplicationForm;
