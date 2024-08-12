import {
  degreeLevels,
  degreeNames,
  degreeSpecializations,
  institutes,
} from "@/Data/staticData";
import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import styles from "./mto.module.css";
// List of Pakistani institutes

// List of degree names
const graduationYears = [];
const currentYear = new Date().getFullYear();
for (let year = 2022; year <= 2024; year++) {
  graduationYears.push({ value: year, label: year.toString() });
}
const EducationInformation = ({
  formData,
  handleChange,
  addEducation,
  deleteEducation,
  errorlist,
}) => {
  const handleResultTypeChange = (e) => {
    const { name, value } = e.target;
    handleChange(e); // Call parent handleChange to update formData

    // Reset percentage, CGPA, Outof fields when ResultType changes
    if (value === "percentage") {
      handleChange({
        target: {
          name: "CGPA",
          value: "",
        },
      });
      handleChange({
        target: {
          name: "Outof",
          value: "",
        },
      });
    } else if (value === "CGPA") {
      handleChange({
        target: {
          name: "CGPA",
          value: "",
        },
      });
    }
  };

  const handleInstituteChange = (selectedOption) => {
    handleChange({
      target: {
        name: "InstituteName",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const handleDegreeNameChange = (selectedOption) => {
    handleChange({
      target: {
        name: "DegreeName",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };
  const handleDegreeLevelChange = (newValue, actionMeta) => {
    handleChange({
      target: {
        name: "DegreeLevel",
        value: newValue ? newValue.value : "",
      },
    });
  };

  const handleDegreeSpecializationChange = (selectedOptions) => {
    handleChange({
      target: {
        name: "DegreeSpecialization",
        value: selectedOptions
          ? selectedOptions.map((option) => option.value)
          : [],
      },
    });
  };

  const handleGraduationYearChange = (newValue, actionMeta) => {
    handleChange({
      target: {
        name: "Graduation_year",
        value: newValue ? newValue.value : "",
      },
    });
  };
  const handleDeleteEducation = (index) => {
    // Implement delete functionality here
    deleteEducation(index);
    toast.success(`Deleted education entry ${index + 1}`);
  };
  return (
    <div className="h-full">
      {formData.education.map((edu, index) => (
        <div key={index} className="mb-5 p-4 border rounded">
          <div className={`${styles.educationcard}`}>
            <div className={`${styles.cardheader} justify-between`}>
              <div className="flex gap-3 font-spartan">
                <FaGraduationCap
                  style={{ color: "white", marginRight: "8px" }}
                />
                <div className="font-spartan ">  {edu.DegreeName}</div>
              </div>
              <div className="">
                <button
                  onClick={() => handleDeleteEducation(index)}
                  className="bg-[#E7A956] font-spartan text-white p-1 text-sm rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className={`${styles.cardbody}`}>
              <div className={`${styles.cardrow}`}>
                <strong className="font-spartan">Degree Name:</strong>
                <div className="font-spartan"> {edu.DegreeName}</div>
              </div>
              <div className={`font-spartan ${styles.cardrow}`}>
                <strong>Institute Name:</strong> {edu.InstituteName}
              </div>
              <div className={`font-spartan ${styles.cardrow}`}>
                <strong>Specialization:</strong>{" "}
                {edu.DegreeSpecialization.join(", ")}
              </div>
              <div className={`font-spartan ${styles.cardrow}`}>
                <strong>Graduation Year:</strong> {edu.Graduation_year}
              </div>

              <div className={`${styles.cardrow}`}>
                <strong className="font-spartan ">CGPA:</strong> {edu.CGPA}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="lg:grid lg:grid-cols-2 lg:gap-5">
        <div className="">
          <label className="text-white font-spartan  block mb-2">
            Degree Name
            {errorlist.DegreeName && <span className="text-red-500"> *</span>}
          </label>
          <CreatableSelect
            name="DegreeName"
            value={
              degreeNames.find(
                (degree) => degree.value === formData.newEducation.DegreeName
              ) ||
              (formData.newEducation.DegreeName
                ? {
                  value: formData.newEducation.DegreeName,
                  label: formData.newEducation.DegreeName,
                }
                : null)
            }
            onChange={handleDegreeNameChange}
            options={degreeNames}
            className="border p-2 rounded w-full mb-3"
            isClearable
            formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
          />
        </div>
        <div>
          <label className="text-white font-spartan  block mb-2">
            Institute Name
            {errorlist.InstituteName && (
              <span className="text-red-500"> *</span>
            )}
          </label>
          <CreatableSelect
            name="InstituteName"
            value={
              institutes.find(
                (institute) => institute.value === formData.newEducation.InstituteName
              ) ||
              (formData.newEducation.InstituteName
                ? {
                  value: formData.newEducation.InstituteName,
                  label: formData.newEducation.InstituteName,
                }
                : null)
            }
            onChange={handleInstituteChange}
            options={institutes}
            className="border p-2 rounded w-full mb-3"
            isClearable
            formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
          />
        </div>
        <div>
          {" "}
          <label className="text-white font-spartan  block mb-2">
            Degree Specialization
            {errorlist.DegreeSpecialization && (
              <span className="text-red-500"> *</span>
            )}
          </label>
          <CreatableSelect
            name="DegreeSpecialization"
            value={formData.newEducation.DegreeSpecialization.map((spec) =>
              degreeSpecializations.find((s) => s.value === spec) || {
                value: spec,
                label: spec,
              }
            )}
            onChange={handleDegreeSpecializationChange}
            options={degreeSpecializations}
            className="border p-2 rounded w-full mb-3"
            isClearable
            isMulti
            formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
          />
        </div>
        <div>
          <label className="text-white font-spartan  block mb-2">
            Graduation Year
            {errorlist.Graduation_year && (
              <span className="text-red-500"> *</span>
            )}
          </label>
          <Select
            name="GraduationYear"
            value={
              graduationYears.find(
                (year) => year.value === formData.newEducation.Graduation_year
              ) ||
              (formData.newEducation.Graduation_year
                ? {
                  value: formData.newEducation.Graduation_year,
                  label: formData.newEducation.Graduation_year,
                }
                : null)
            }
            onChange={handleGraduationYearChange}
            options={graduationYears}
            className="border p-2  rounded w-full mb-3"
          />
        </div>
        {/* <div>
     <label className="text-white block mb-2">Result Type</label>
      <select
        name="ResultType"
        value={formData.newEducation.ResultType}
        onChange={handleResultTypeChange}
        className="border p-2 rounded w-full mb-3"
      >
        <option value="">Select Result Type</option>
        <option value="percentage">Percentage</option>
        <option value="CGPA">CGPA</option>
      </select>
     </div> */}

        {/* {formData.newEducation.ResultType === "percentage" && (
        <div className="mb-3">
          <label className="text-white block mb-2">Percentage</label>
          <input
            type="text"
            name="percentage"
            value={formData.newEducation.percentage}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
      )}
   */}

        <div>
          <label className="text-white block mb-2 font-spartan ">
            CGPA (<span className="text-sm">out of 4</span>)
            {errorlist.CGPA && <span className="text-red-500"> *</span>}
          </label>
          <input
            type="number"
            name="CGPA"
            value={formData.newEducation.CGPA}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-3"
          />
        </div>
      </div>
      <button
        onClick={addEducation}
        className="bg-blue-500 font-spartan  text-white p-2 rounded mt-5"
      >
        Add More
      </button>{" "}
    </div>
  );
};

export default EducationInformation;
