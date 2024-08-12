import React from "react";
import { toast } from "react-toastify";

import styles from "./mto.module.css";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import Select from "react-select";
import { hasWorkExperience } from "@/Data/staticData";

const WorkExperience = ({
  formData,
  handleChange,
  addWorkExperience,
  deleteexperience,
  errorlist,
}) => {
  const handleDeleteExperiece = (index) => {
    // Implement delete functionality here
    deleteexperience(index);
    toast.success(`Deleted education entry ${index + 1}`);
  };

  const handlehasworkExperience = (newValue, actionMeta) => {
    handleChange({
      target: {
        name: "hasWorkExperience",
        value: newValue ? newValue.value : "",
      },
    });
  };
  return (
    <div>
      <label className="block mb-2 font-spartan text-lg text-white">
        Do you have Work Experience?
      </label>
      <Select
        name="hasWorkExperience"
        value={
          hasWorkExperience.find(
            (HWE) => HWE.value === formData.hasWorkExperience
          ) ||
          (formData.hasWorkExperience
            ? {
                value: formData.hasWorkExperience,
                label: formData.hasWorkExperience,
              }
            : null)
        }
        onChange={handlehasworkExperience}
        options={hasWorkExperience}
        className="border p-2 rounded w-full mb-3"
      />

      {formData.hasWorkExperience === "Yes" && (
        <div className="mt-5 ">
          <label className="block mb-2 font-spartan  text-white">
            Work History (Start With Most Recent)
          </label>

          {formData.workExperience.map((experience, index) => (
            <div key={index} className="mb-5 p-4 border rounded">
              <div className={`${styles.educationcard}`}>
                <div className={`${styles.cardheader} justify-between`}>
                  <div className="flex gap-3">
                    <FaBriefcase
                      style={{ color: "white", marginRight: "8px" }}
                    />
                   <div className="font-spartan "> {experience.PresentlyWorking
                      ? "Currently Working"
                      : "Previous Experience"}</div>
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => handleDeleteExperiece(index)}
                      className="bg-[#ffcc00] text-white  text-sm p-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className={`${styles.cardbody}`}>
                  <div className={`${styles.cardrow}`}>
                    <strong className="font-spartan ">Position Held:</strong>
                    <div> {experience.PositionHeld}</div>
                  </div>
                  <div className={`${styles.cardrow}`}>
                    <strong className="font-spartan ">Organization Name:</strong>{" "}
                    {experience.OrganizationName}
                  </div>
                  <div className={`${styles.cardrow}`}>
                    <strong className="font-spartan ">From Date:</strong> {experience.FromDate}
                  </div>
                  <div className={`${styles.cardrow}`}>
                    <strong className="font-spartan ">To Date:</strong> {experience.ToDate}
                  </div>
                  <div className={`${styles.cardrow}`}>
                    <strong className="font-spartan ">Presently Working:</strong>{" "}
                    {experience.PresentlyWorking ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-5 lg:grid text-white lg:grid-cols-2 lg:gap-5">
            <div>
              {" "}
              <label className="block mb-2">
                Position Held
                {errorlist.PositionHeld && (
                  <span className="text-red-500"> *</span>
                )}
              </label>
              <input
                type="text"
                name="PositionHeld"
                value={formData.newExperience.PositionHeld || ""}
                onChange={handleChange}
                className="border p-2 text-gray-600 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">
                Organization Name
                {errorlist.OrganizationName && (
                  <span className="text-red-500"> *</span>
                )}
              </label>
              <input
                type="text"
                name="OrganizationName"
                value={formData.newExperience.OrganizationName || ""}
                onChange={handleChange}
                className="border p-2 rounded text-gray-600 w-full"
              />
            </div>
            <div>
              {" "}
              <label className={` block mb-2`} >
                From Date
                {errorlist.FromDate && <span className="text-red-500"> *</span>}
              </label>
              <input
                type="date"
                name="FromDate"
                value={formData.newExperience.FromDate || ""}
                onChange={handleChange}
                className="border p-2 text-black rounded w-full"
              />
            </div>
            {!formData.newExperience.PresentlyWorking && (
              <div>
                <label className="block mb-2">
                  To Date
                  {errorlist.ToDate && <span className="text-red-500"> *</span>}
                </label>
                <input
                  type="date"
                  name="ToDate"
                  value={
                    !formData.newExperience.PresentlyWorking
                      ? formData.newExperience.ToDate || ""
                      : "0000-00-00"
                  }
                  onChange={handleChange}
                  className="border p-2 rounded w-full text-black"
                />
              </div>
            )}
            <div>
              <label className="block mb-2 pt-10">
                Presently Working
                {errorlist.PresentlyWorking && (
                  <span className="text-red-500"> *</span>
                )}
              </label>
              <div className="flex justify-start">
                <input
                  type="checkbox"
                  name="PresentlyWorking"
                  checked={formData.newExperience.PresentlyWorking || false}
                  onChange={handleChange}
                  className="border p-2 pb-5 rounded"
                />
              </div>
            </div>
          </div>

          <button
            onClick={addWorkExperience}
            className="bg-blue-500 text-white p-2 rounded mt-5 font-spartan "
          >
            Add More
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkExperience;
