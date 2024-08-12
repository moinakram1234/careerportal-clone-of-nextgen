import React from 'react';

const Step1 = ({ formData, handleChange }) => {
  return (
    <div className="w-full ">
      <label className="block mb-2">Disability if any</label>
      <select
        name="disability"
        value={formData.disability}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
      <label className="block mb-2">Do you require Special Assistance at work?</label>
      <select
        name="specialAssistance"
        value={formData.specialAssistance}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
    </div>
  );
};

export default Step1;
