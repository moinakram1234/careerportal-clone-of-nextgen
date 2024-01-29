import BaseLayout from "../../admincomponents/BaseLayout";
import React, { useState,useEffect } from "react";
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createJobPost } from "@/server_requests/client_requests";
import Loader from "@/components/loader";
import { useRouter } from "next/router";
import { isTokenExpired } from "../tokenUtils";
import parseJwt from "./parsetoken";
const ReactQuill = dynamic(
  () => import('react-quill'),
  {ssr: false}
);

const PostJobs = () => {
  const [jobtitle, setJobtitle] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [joblocation, setJobLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const router = useRouter();
  const [step, setStep] = useState(1);

  const redirectToHome = () => router.push('/');

  const checkTokenExpiration = async () => {
    
    const token = localStorage.getItem('token');
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
      localStorage.removeItem('token');
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
      };
      //server request
      const newPost = await createJobPost(jobData);

      setJobtitle("");
      setJobtype("");
      setJobLocation("");
      setDescription("");

      // The job post was successfully created
      toast('Job post created successfully');
      setStep(3); // Move to the next step
    } catch (error) {
      // Handle errors
      console.error('Error creating job post:', error);
      toast('Failed to create job post. Please try again later.', { type: 'error' });
    }
    finally{
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
             
              <input
                type="text"
                id="jobtitle"
                className="w-[30%] p-2 border rounded-md"
                placeholder="Enter job title"
                value={jobtitle}
                onChange={(e) => setJobtitle(e.target.value)}
                required
              />
              <input
                type="text"
                id="jobtype"
                className="w-[30%] p-2 border rounded-md"
                placeholder="Enter job Type"
                value={jobtype}
                onChange={(e) => setJobtype(e.target.value)}
                required
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
                className="w-[50%] p-2 border rounded-md"
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
                className="h-52 w-[50%]" // Adjust the height as needed
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
        <BaseLayout>
          {isLoading && (
            <div>
              <Loader />
            </div>
          )}
          {!isLoading && (
            
            <div className=" mt-20">
             <div className="flex gap-1 ">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 mt-1 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
             <a class=" text-ellipsis whitespace-nowrap text-gray-500" href="/dashboard">Dashboard</a>
              
              <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-1 text-gray-500"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 mt-1 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
              <a class="font-medium text-foreground " href="/dashboard/postjob">post</a>
             </div>
              <h2 class="text-xl font-bold  mt-2 pb-3 tracking-tight grid grid-cols-1 gap-4 p-4 md:grid-cols-3">Create a post</h2>
              <form onSubmit={step === 2 ? handleSubmit : nextStep}>
                {renderStep()}
                {renderNavigationButtons()}
              </form>
            </div>
          )}
          <ToastContainer />
        </BaseLayout>
      ) : (
        <p>Session expired</p>
      )}
    </div>
  );
};

export default PostJobs;