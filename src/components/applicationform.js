import { createJobapplication } from "@/server_requests/client_requests";
import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./loader";

const ApplicationForm = ({postid }) => {
  const [istoggle, setToggle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pdffile, setPdffile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    qualification: "",
    selectedDepartment: "",
    address: "",
    postid:"",
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

  // const handlePhoneChange = (e) => {
  //   const { name, value } = e.target;

  //   // Check the format and set an error message if invalid
  //   if (!isValidPakistanPhoneNumber(value) && value !== "") {
  //     setFileError("Invalid phone number format.");

  //   } else {

  //     setFileError(""); // Clear the error message
  //   }
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  //   // Update the state with the entered value

  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdffile(file);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    setIsLoading(true);
    try {

     
      if (
        !isValidPakistanPhoneNumber(formData.phone) &&
        formData.phone !== ""
      ) {
        setFileError("Invalid phone number format.");
        return;
      } else {
        setFileError(""); // Clear the error message
      }
      //add post id
      const response = await createJobapplication(formData, pdffile,postid);
      toast(response.message); // Clear the form data and reset the form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        qualification: "",
        selectedDepartment: "",
        cv: "",
        address: "",
        postid: "",
      });
      setPdffile(null);
      e.target.reset();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Error submitting application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  // ... other imports ...

  return (
    <div className="fixed inset-0 flex justify-center">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="relative h-4/5 lg:h-full bg-white mt-5 sm:p-6 md:p-8 lg:p-5 w-72 lg:w-full xl:w-2/5 rounded-md z-10">
        <div className="container p-4 lg:p-0">
          {isLoading && <Loader />}
          {!isLoading && istoggle && (
            <form className="max-w-lg mx-auto mt-8 " onSubmit={handleSubmit}>
              {/* ... other form inputs ... */}
              <div className="mb-2">
                <label htmlFor="fullName" className="block text-sm">
                  Full Name:
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="border rounded-xl w-full mt-1 sm:p-3" // Responsive width
                  required
                />
              </div>
              {/* ... other form inputs ... */}
              <div className="mb-2">
                <label htmlFor="phone" className="block text-sm">
                  Phone:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border rounded-xl w-full mt-1 sm:p-3 " // Responsive width
                  required
                />
              </div>
              {/* ... other form inputs ... */}
              <div className="mb-2">
                <label htmlFor="email" className="block text-sm">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded-xl w-full mt-1 sm:p-3 "
                  required
                />
              </div>
              {/* ... other form inputs ... */}
              <div className="mb-2">
                <label htmlFor="qualification" className="block text-sm">
                  Qualification:
                </label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="border rounded-xl w-full mt-1 sm:p-3 "
                  required
                />
              </div>
              {/* ... other form inputs ... */}
              {/* <div className="mb-2">
                <label htmlFor="selectedDepartment" className="block text-sm">
                  Department:
                </label>
                <input
                  type="text"
                  id="selectedDepartment"
                  name="selectedDepartment"
                  value={formData.selectedDepartment}
                  onChange={handleChange}
                  className="border rounded-xl w-full mt-1 sm:p-3 " // Responsive width
                  required
                />
              </div> */}
              {/* ... other form inputs ... */}
              <div className="mb-2">
                <label htmlFor="file" className="block text-sm">
                  File:
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="border rounded-xl w-full mt-1 sm:p-3 " // Responsive width
                  required
                />
              </div>
              {/* ... other form inputs ... */}
              <div className="mb-2">
                <label htmlFor="address" className="block text-sm">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border rounded-xl w-full mt-1 sm:p-3 "
                  required
                />
              </div>
              {/* ... other form inputs ... */}
              {fileError && <p className="text-red-500 mt-2">{fileError}</p>}

              <button
                type="submit"
                className="bg-blue-500 w-full text-white px-4 rounded-xl mt-1 sm:p-3  hover:bg-blue-600"
              >
                Submit Application
              </button>
              <button
                className="bg-blue-500 w-full text-white px-4 mt-2 sm:p-3 rounded-xl hover:bg-blue-600"
                onClick={onClose}
              >
                Close
              </button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ApplicationForm;
