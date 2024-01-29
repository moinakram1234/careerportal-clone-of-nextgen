// components/UpdatePost.js

import { useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { updateJobPost } from "@/server_requests/client_requests";
import "react-quill/dist/quill.snow.css";
import SpinnerIcon from "./spinnerIcon";
const UpdatePost = ({ jobPost, onClose }) => {
  const [jobtitle, setJobtitle] = useState(jobPost.jobTitle);
  const [jobtype, setJobtype] = useState(jobPost.jobType);
  const [joblocation, setJobLocation] = useState(jobPost.jobLocation);
  const [description, setDescription] = useState(jobPost.description);
  const [_id, setId] = useState(jobPost._id);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the function from the separate API file to handle the update
      const updatedJobPost = await updateJobPost({
        _id,
        jobtitle,
        jobtype,
        joblocation,
        description,
      });
     if (updatedJobPost)
     {
      setLoading(true);
     }
      console.log("Job post updated successfully:", updatedJobPost);
      onClose();
    } catch (error) {
      console.error("Error updating job post:", error);
    }
  };


  const handleQuillChange = (value) => {
    setDescription(value);
  };
  const nextStep = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };
  const renderStepSeparators = () => {
    return (
      <div className="flex gap-2   mb-8">
      <hr className={` border-t-4 w-1/5  ${step == 1 ? 'border-[#FFC83D]' : 'border-gray-300'} `}  />
      <hr className={` border-t-4 w-1/5  ${step == 2 ? 'border-[#FFC83D]' : 'border-gray-300'}`} />
      <hr className={` border-t-4 w-1/5  ${step == 3 ? 'border-[#FFC83D]' : 'border-gray-300'}`} />
    </div>
    );
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            {renderStepSeparators()}
            <div className="mb-4 flex gap-5">
              <div className="flex-1">
                <input
                  type="text"
                  id="jobtitle"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter job title"
                  value={jobtitle}
                  onChange={(e) => setJobtitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  id="jobtype"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter job Type"
                  value={jobtype}
                  onChange={(e) => setJobtype(e.target.value)}
                  required
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <div className="">
            <div className="mb-4  gap-5">
              <div className="flex-1">
                <input
                  type="text"
                  id="jobLocation"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter job Location"
                  value={joblocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <ReactQuill
                  value={description}
                  onChange={handleQuillChange}
                  theme="snow"
                  className="h-52 w-full" // Adjust the height as needed
                  placeholder="Enter job description"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            {renderStepSeparators()}
            <p>Job post Edit successfully!</p>
            {/* Additional details or actions for step 3 */}
          </div>
        );
      default:
        return null;
    }
  };
  const renderNavigationButtons = () => {
    if (step === 1) {
      return (
        <button
          type="submit"
          className="bg-[#FFC83D] text-white py-2 px-4 mt-10 rounded-md hover:bg-[#e1d7bf]"
        >
          Next
        </button>
      );
    } else if (step === 2) {
      return (
        <>
          <button
            type="button"
            className="bg-[#FFC83D] text-white py-2 px-4 mt-10 rounded-md hover:bg-[#e1d7bf]"
            onClick={prevStep}
          >
            Previous
          </button>
          <button
            type="submit"
            className="bg-[#FFC83D] text-white py-2 px-4 mt-10 rounded-md hover:bg-[#e1d7bf] ml-4"
          >
          {
            loading ? (
             <SpinnerIcon />
            ) : (
              <span>Update</span>
            )
          }
          </button>
        </>
      );
    } else {
      // No navigation buttons for step 3
      return null;
    }
  };

  return (
    <div className="">
    <h2 class="text-3xl font-bold tracking-tight mt-2 pb-3 ">Edit a post</h2>
    <form onSubmit={step === 2 ? handleSubmit : nextStep}>
      {renderStep()}
      {renderNavigationButtons()}
    </form>
    </div>
  );
};

export default UpdatePost;
