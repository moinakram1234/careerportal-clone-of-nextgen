import BaseLayout from "../../admincomponents/BaseLayout";
import React, { useState, useEffect } from "react";


import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createJobPost } from "@/server_requests/client_requests";
import Loader from "@/components/loader";
import { useRouter } from "next/router";
import { isTokenExpired } from "@/components/tokenUtils";
import parseJwt from "@/components/parsetoken";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { optionsexperince, optionsDepartment } from "@/Data/staticData";
import { Range } from "react-range";
import Link from "next/link";
// import Slider from 'react-slider';
const PostJobs = () => {
  const [jobtitle, setJobtitle] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [joblocation, setJobLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const router = useRouter();
  const [step, setStep] = useState(1);
  // Additional state variables
  const [department, setDepartment] = useState("");
  const [submissionDeadline, setSubmissionDeadline] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const redirectToHome = () => router.push("/");
 const [values, setValues] = useState([0, 10]); // Initial range values


  const checkTokenExpiration = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Token is not present, redirect to home
      redirectToHome();
      return;
    }

    const tokenparse = parseJwt(token);

    if (!tokenparse || tokenparse.isadmin === undefined) {
      // Token parsing failed or isadmin property is not present, redirect to home
      redirectToHome();
      return;
    }

    if (tokenparse.isadmin === false) {
      // User is not an admin, redirect to home
      redirectToHome();
      return;
    }
    if (isTokenExpired(token)) {
      // Token is expired, remove it and redirect to home
      localStorage.removeItem("token");
      console.log(token);
      setIsValidToken(false);
      redirectToHome();
    } else {
      // Token is valid, update state
      setIsValidToken(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const jobData = {
        jobtitle,
        jobtype,
        joblocation,
        description,
        department,
        submissionDeadline,
        experienceLevel,
        values,

      };
      //server request
      const newPost = await createJobPost(jobData);

      setJobtitle("");
      setJobtype("");
      setJobLocation("");
      setDescription("");

      // The job post was successfully created
      toast("Job post created successfully");
      setStep(3); // Move to the next step
    } catch (error) {
      // Handle errors
      console.error("Error creating job post:", error);
      toast("Failed to create job post. Please try again later.", {
        type: "error",
      });
    } finally {
      setIsLoading(false);
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
    // <div className="flex gap-2   mb-8">
    //     <hr
    //       className={` border-t-4 w-[16.7%]  ${
    //         step == 1 ? "border-[#FFC83D]" : "border-gray-300"
    //       } `}
    //     />
    //     <hr
    //       className={` border-t-4 w-[16.7%]   ${
    //         step == 2 ? "border-[#FFC83D]" : "border-gray-300"
    //       }`}
    //     />
    //     <hr
    //       className={` border-t-4 w-[16.7%]   ${
    //         step == 3 ? "border-[#FFC83D]" : "border-gray-300"
    //       }`}
    //     />
    //   </div>



<div className="flex gap-2   mb-8">
     <ol class="flex items-center w-full mb-4 sm:mb-5">
    <li class={`flex w-full items-center   after:content-[''] after:w-full after:h-1 after:border-b transition duration-700 ease-in-out ${step==1?"after:border-blue-100 ":"after:border-amber-400 "}after:border-4 after:inline-block `}>
        <div class={`flex items-center justify-center w-10 h-10   ${step == 1  ? "bg-amber-300":"bg-white"} rounded-full lg:h-12 lg:w-12  shrink-0`}>
            <svg class="w-4 h-4 text-black lg:w-6 lg:h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
            </svg>
        </div>
    </li>
    <li class={`flex w-full items-center   after:content-[''] after:w-full after:h-1 after:border-b transition duration-700 ease-in-out ${step==3 ?"after:border-amber-400 ":"after:border-blue-100 "}after:border-4 after:inline-block `}>
    <div class={`flex items-center justify-center w-10 h-10 transition duration-700 ease-in-out   ${step == 2 ? "bg-amber-300":"bg-white"} rounded-full lg:h-12 lg:w-12  shrink-0`}>
            <svg class="w-4 h-4 text-black lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z"/>
                <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z"/>
            </svg>
        </div>
    </li>
    <li class="flex items-center w-full">
    <div class={`flex items-center justify-center w-10 h-10  ${step == 3 ? "bg-green-300":"bg-white"} transition duration-700 ease-in-out rounded-full lg:h-12 lg:w-12  shrink-0`}>
            <svg class={`w-4 h-4  lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20`}>
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
            </svg>
        </div>
    </li>
</ol>
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
              <input
                type="text"
                id="jobtitle"
                className="w-[33%] p-2 border rounded-md"
                placeholder="Enter job title"
                value={jobtitle}
                onChange={(e) => setJobtitle(e.target.value)}
                required
              />
              <input
                type="text"
                id="jobtype"
                className="w-[33%] p-2 border rounded-md"
                placeholder="Enter job Type"
                value={jobtype}
                onChange={(e) => setJobtype(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col w-[24.2%]">
                <label
                  htmlFor="experienceLevel"
                  className="block text-sm font-medium text-gray-700"
                >
                  Experience Level:
                </label>
                <Select
                  id="experienceLevel"
                  defaultValue={experienceLevel}
                  onChange={setExperienceLevel}
                  options={optionsexperince}
                />
              </div>
              <div className="mb-10" />
              <div className="flex flex-col w-[16%] ml-5">
                <label
                  htmlFor="submissionDeadline"
                  className="block text-sm font-medium text-gray-700"
                >
                  Submission Deadline:
                </label>
                <DatePicker
                  id="submissionDeadline"
                  selected={submissionDeadline}
                  onChange={(date) => setSubmissionDeadline(date)}
                  className="w-[100%] p-2 border rounded-md"
                  placeholderText="Submission Deadline"
                  required
                />
              </div>
              <div className="flex flex-col w-[24.2%] ml-5">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department:
                </label>
                <Select
                  id="department"
                  defaultValue={department}
                  onChange={setDepartment}
                  options={optionsDepartment}
                />
              </div>
              <div className="mb-4" />
              <div className="mb-4" />
            </div>
            <div className="mb-4" />

     
            <div>
              <label
                htmlFor="Experience range"
                className="block text-sm font-medium text-gray-700"
              >
                Experience range (in years):
              </label>
              <Range
              step={1}
              min={0}
              max={10}
              values={values}
              onChange={setValues}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "20%",
                    marginTop: "30px",
                    backgroundColor: "#ccc",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props, index, isDragged }) => {
                return (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#FFC83D",
                    }}
                  >
                    <span style={{ position: 'absolute', top: '-20px'  }} >
                      {values[index]}
                    </span>
                  </div>
                  
                );
              }}
            />
            
          </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mb-4">
              {renderStepSeparators()}
              <input
                type="text"
                id="jobLocation"
                className="w-[70%] p-2 border rounded-md"
                placeholder="Enter job Location"
                value={joblocation}
                onChange={(e) => setJobLocation(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <ReactQuill
                value={description}
                onChange={handleQuillChange}
                theme="snow"
                className="h-52 w-[70%]" // Adjust the height as needed
                placeholder="Enter job description"
              />
            </div>
          </>
        );
      case 3:
        return (
          <div>
            {renderStepSeparators()}
            <p>Job post created successfully!</p>
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
            Post
          </button>
        </>
      );
    } else {
      // No navigation buttons for step 3
      return null;
    }
  };

  return (
    <div>
      {isValidToken == true ? (
        <BaseLayout >
          <div className="" style={{ paddingLeft: '40px' }}>
          {isLoading && (
            <div>
              <Loader />
            </div>
          )}
          {!isLoading && (
            <div className=" mt-20">
              <div className="flex gap-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="w-4 mt-1 h-4 mr-2 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg>
                <Link
                  class=" text-ellipsis whitespace-nowrap text-gray-500"
                  href="/dashboard"
                >
                  Dashboard
                </Link>

                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mt-1 text-gray-500"
                >
                  <path
                    d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="w-4 h-4 mr-2 mt-1 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg>
                <Link
                  class="font-medium text-foreground "
                  href="/dashboard/postjob"
                >
                  post
                </Link>
              </div>
              <h2 class="text-xl font-bold  mt-2 pb-3 tracking-tight grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
                Create a post
              </h2>
              <form onSubmit={step === 2 ? handleSubmit : nextStep}>
                {renderStep()}
                {renderNavigationButtons()}
              </form>
            </div>
          )}
          <ToastContainer />
          </div>
        </BaseLayout>
      ) : (
        <p>Session expired</p>
      )}
    </div>
  );
};

export default PostJobs;
