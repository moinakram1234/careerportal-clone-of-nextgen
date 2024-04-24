import React, { useState } from "react";
import { Select } from "@chakra-ui/react";

const AppFilters = ({ applications, SetApp_Data, isLoading }) => {
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedQualification, setSelectedQualification] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
const [selectedDepartment, setSelectedDepartment] = useState("");
const [selectedcountryorregion, setSelectedcountryorregion] = useState("");
const [selectedjobTitle, setSelectedjobTitle] = useState("");
const filterApplications = async () => {
  // Set isLoading to true to indicate loading
  isLoading(true);

  // Simulate a 2-second loading delay
  setTimeout(() => {
    const filteredApplications = applications.filter(
      (app) =>
        (selectedCity ? app.city === selectedCity : true) &&
        (selectedDepartment ? app.department === selectedDepartment : true) &&
        (selectedExperience ? app.experience === selectedExperience : true) &&
        (selectedQualification
          ? app.qualification === selectedQualification
          : true)
    );

    SetApp_Data(filteredApplications);
    // Set isLoading to false to indicate loading is complete
    isLoading(false);
  }, 1000);
};
  const CustomSelect = ({ placeholder, value, onChange, options }) => (
    <Select
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    >
        {options && options.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </Select>
);
// Extract unique values from an array
const uniqueValues = (arr, key) => {
  if (!arr || arr.length === 0) {
      return [];
  }

  const uniqueSet = new Set();
  arr.forEach(item => {
      uniqueSet.add(item[key]);
  });
  return Array.from(uniqueSet);
};
const uniqueValues_from_post = (arr, key) => {
  if (!arr || arr.length === 0) {
      return [];
  }

  const uniqueSet = new Set();
  arr.forEach(obj => {
      obj.jobpostApp.forEach(item => {
          uniqueSet.add(item[key]);
      });
  });
  return Array.from(uniqueSet);
};

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
      <CustomSelect
        placeholder="Select City"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        options={uniqueValues(applications, 'city')}
    />
       <CustomSelect
        placeholder="Select Experience"
        value={selectedExperience}
        onChange={(e) => setSelectedExperience(e.target.value)}
        options={uniqueValues(applications, 'experience')}
    />
         <CustomSelect
        placeholder="Select Qualification"
        value={selectedQualification}
        onChange={(e) => setSelectedQualification(e.target.value)}
        options={uniqueValues(applications, 'qualification')}
    />
            <CustomSelect
        placeholder="Select Department"
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
        options={uniqueValues(applications, 'selectedDepartment')}
    />
           <CustomSelect
        placeholder="Select Country or Region"
        value={selectedcountryorregion}
        onChange={(e) => setSelectedcountryorregion(e.target.value)}
        options={uniqueValues(applications, 'countryorregion')}
    />       <CustomSelect
    placeholder="Select Position Title"
    value={selectedjobTitle}
    onChange={(e) => setSelectedjobTitle(e.target.value)}
    options={uniqueValues_from_post(applications, 'jobTitle')}
/>
        <button className="bg-amber-400 w-28 rounded hover:bg-amber-200 hover:text-black text-white"  onClick={filterApplications}>Apply Filters</button>
      </div>
     
    </div>
  );
};

export default AppFilters;
