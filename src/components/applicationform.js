// components/ApplicationForm.js

import React, { useState } from "react";
import ApplicationPreview from "./applicationpreview";
const ApplicationForm = () => {
    const[istoggle,setToggle]=useState(true)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    qualification: "",
    selecteddepartment: "",
    Cv: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlePreview = () => {
    setToggle(!istoggle);
  };



  return (
 <div>
       {istoggle&&(<form className="max-w-lg mx-auto">
      <label htmlFor="fullName" className="block mb-2">
        Full Name:
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
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
        />
      </label>

      <label htmlFor="email" className="block mb-2">
        Email:
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
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
        />
      </label>

      <label htmlFor="selecteddepartment" className="block mb-2">
        Selected Department:
        <input
          type="text"
          id="selecteddepartment"
          name="selecteddepartment"
          value={formData.selecteddepartment}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
        />
      </label>

      <label htmlFor="Cv" className="block mb-2">
        CV:
        <input
          type="file"
          id="Cv"
          name="Cv"
          value={formData.Cv}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
        />
      </label>

      <label htmlFor="address" className="block mb-2">
        Address:
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
        />
      </label>

      <button
        onClick={() => handlePreview()}
        className="bg-blue-500 text-white py-2 px-4 mt-6 rounded-md hover:bg-blue-600"
      >
       Next
      </button>
    </form>)}
  
    {!istoggle && (
        <ApplicationPreview formData={formData} onEdit={() => setToggle(true)} />
      )}
    </div>
  );
};

export default ApplicationForm;