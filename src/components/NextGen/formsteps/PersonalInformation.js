import { cityOptions } from "@/Data/staticData";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
const languagesSpoken = [
  { value: "English", label: "English" },

  { value: "Urdu", label: "Urdu" },
];

const PersonalInformation = ({ formData, handleChange, errorlist,handleFileChange }) => {
  const [customCityOptions, setCustomCityOptions] = useState(cityOptions);

  const addNewCityOption = { value: "ADD_NEW", label: "Add  City..." };

  // Add the 'Add New City' option to the beginning of the cityOptions array
  const modifiedCityOptions = [addNewCityOption, ...customCityOptions];

  const handlemobile = (event) => {

    let value = event.target.value;
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, '');
    // Add dash after 4th digit if more than 4 digits are entered and dash is not already present
    if (numbers.length > 4 && !value.includes('-')) {
      value = `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    } else if (numbers.length <= 4) {
      value = numbers;
    }
    handleChange({
      target: {
        name: "mobile",
        value: value,
      },
    });
  };
  //   const promptUserForNewCity = () => {
  //   const newCityName = window.prompt("Enter the new city name:");
  //   if (newCityName) {
  //     const newCityOption = { value: newCityName, label: newCityName };
  //     setCustomCityOptions((prevOptions) => [newCityOption, ...prevOptions]);
  //     handleCity(newCityOption); // Automatically select the new city
  //   }
  // };
  return (
    <div className="lg:grid   lg:grid-cols-2 lg:gap-4">
      <div>
        <label className=" font-spartan text-white block mb-2">
          Full Name
          {errorlist.name && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mb-4"
          required
        />
      </div>
      <div>
        <label className=" font-spartan text-white block mb-2">
          Gender
          {errorlist.gender && <span className="text-red-500"> *</span>}
        </label>
        <div className="mb-4">
          <label className=" font-spartan text-white mr-4">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              checked={formData.gender === "Male"}
              className="mr-2"
            />
            Male
          </label>
          <label className=" font-spartan text-white mr-4">
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              checked={formData.gender === "Female"}
              className="mr-2"
            />
            Female
          </label>
          <label className="font-spartan text-white mr-4">
            <input
              type="radio"
              name="gender"
              value="Other"
              onChange={handleChange}
              checked={formData.gender === "Other"}
              className="mr-2"
            />
            Other
          </label>
        </div>
      </div>
      <div>
        <label className="font-spartan text-white block mb-2">
          Date of Birth
          {errorlist.dob && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="border p-2 border-gray-300 rounded w-full mb-4"
        />
      </div>
      <div>
        {" "}
        <label className="font-spartan text-white block mb-2">
          Email Address
          {errorlist.email && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 border-gray-300 rounded w-full mb-4"
        />
      </div>
      <div>
        <label className="font-spartan text-white block mb-2">
          Mobile Number (e.g., 03XX-XXXXXXX)
          {errorlist.mobile && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="tel"
          name="mobile"
             placeholder="03XX-XXXXXXX"
          value={formData.mobile}
          onChange={handlemobile}
          className="border p-2 border-gray-300 rounded w-full mb-4"
        />
      </div>
      <div>
        <label className="font-spartan text-white block mb-2">
          CNIC No. (e.g., XXXXX-XXXXXXX-X)
          {errorlist.cnic && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="text"
          name="cnic"
          value={formData.cnic}
          onChange={handleChange}
          className="border p-2 border-gray-300 rounded w-full mb-4"
        />
      </div>
      {/* <div>
        <label className=" text-white block mb-2">Spoken languages
        { errorlist.languages && <span className="text-red-500">  *</span>}
        </label>

        <CreatableSelect
          isMulti
          name="languages"
          options={languagesSpoken}
          className="basic-multi-select"
          classNamePrefix="select"
          value={formData.languages}
          onChange={(selectedOptions) => {
            handleChange({
              target: {
                name: "languages",
                value: selectedOptions,
              },
            });
          }}
          formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
        />
      </div> */}
      <div>
        <label className="font-spartan text-white block mb-2">
          Current City
          {errorlist.city && <span className="text-red-500"> *</span>}
        </label>
        <div>
      
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="border p-2 border-gray-300 rounded w-full mb-4"
        />
      </div>
        {/* <CreatableSelect
          isClearable
          onChange={(selectedOption) => {
            if (selectedOption && selectedOption.value === "ADD_NEW") {
              promptUserForNewCity();
            } else {
              handleCity(selectedOption);
            }
          }}
          options={modifiedCityOptions}
          value={modifiedCityOptions.find(
            (option) => option.value === formData.city
          )}
          className="basic-single"
          classNamePrefix="select"
          formatCreateLabel={(inputValue) => `Add "${inputValue}"...`}
        /> */}
      </div>
      <div>
        {" "}
        <label className="font-spartan text-white block mb-2">
          Permanent Address
          {errorlist.permanentaddress && (
            <span className="text-red-500"> *</span>
          )}
        </label>
        <input
          type="text"
          name="permanentaddress"
          value={formData.permanentaddress}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
      </div>
      <div>
        {" "}
        <label className="font-spartan text-white block mb-2">
          Current Address
          {errorlist.currentaddress && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="text"
          name="currentaddress"
          value={formData.currentaddress}
          onChange={handleChange}
          className="border p-2 border-gray-300 rounded w-full mb-4"
        />
      </div>
      <div>
        <label className="font-spartan text-white block mb-2">
          LinkedIn Handle
          {errorlist.linkedinhandle && <span className="text-red-500"> *</span>}
        </label>
        <input
          type="text"
          name="linkedinhandle"
          value={formData.linkedinhandle}
          onChange={handleChange}
          className=" shadow-sm border border-gray-300 p-2 rounded w-full mb-4"
        />
  
      </div>
      <div>
      <label className="font-spartan text-white block mb-2">
          CV
         
        </label>
        <input
  type="file"
  onChange={handleFileChange}
  className="border-2 border-green-500 p-2 rounded bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200"
/>
  
      </div>
    </div>
  );
};

export default PersonalInformation;
