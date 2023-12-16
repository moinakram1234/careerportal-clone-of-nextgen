import { createJobapplication } from "@/server_requests/client_requests";
import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplicationForm = () => {
  const [istoggle, setToggle] = useState(true);
  const [pdffile, setPdffile] = useState(null);
  const [fileError, setFileError] = useState("");
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
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

// Check if the entered phone number is in the format of a Pakistani mobile number
const isValidPakistanPhoneNumber = (phoneNumber) => {
  // Regular expression for Pakistan phone number format
  const phoneRegex = /^(\+92|0092|0)[0-9]{10}$/;

  return phoneRegex.test(phoneNumber);
};

const handlePhoneChange = (e) => {
  const { name, value } = e.target;

  // Check the format and set an error message if invalid
  if (!isValidPakistanPhoneNumber(value) && value !== "") {
    setFileError("Invalid phone number format. Please enter a valid Pakistani phone number.");
  } else {
    setFileError(""); // Clear the error message
  }

  // Update the state with the entered value
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};




  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdffile(file)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createJobapplication(formData,pdffile);
    
    // Clear the form data and reset the form
    // setFormData({
    //   fullName: "",
    //   phone: "",
    //   email: "",
    //   qualification: "",
    //   selectedDepartment: "",
    //   cv: "",
    //   address: "",
    // });

    // e.target.reset();
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
              onChange={handlePhoneChange}
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
          {fileError && (
            <p className="text-red-500 mt-2">{fileError}</p>
          )}
       
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
