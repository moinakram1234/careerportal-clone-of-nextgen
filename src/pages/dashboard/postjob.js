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
  
  return (
  <div>  {isValidToken==true?(<BaseLayout>
      {isLoading&&(     <div >
       <Loader />
     </div>)}
     { !isLoading&&(<div className=" max-h-screen  mx-auto w-1/2 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Post a Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="jobtitle"
              className="block text-gray-500 text-sm font-bold mb-2"
            >
              Job Title
            </label>
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
          <div className="mb-4">
            <label
              htmlFor="jobtype"
              className="block text-gray-500 text-sm font-bold mb-2"
            >
              Job Type
            </label>
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
          <div className="mb-4">
            <label
              htmlFor="jobLocation"
              className="block text-gray-500 text-sm font-bold mb-2"
            >
              Job Location
            </label>
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
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-500 text-sm font-bold mb-2"
            >
              Job Description
            </label>
            <ReactQuill
              value={description}
              onChange={handleQuillChange}
              theme="snow"
              className="  h-52" // Adjust the height as needed
              placeholder="Enter job description"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 mt-10 rounded-md hover:bg-blue-600"
          >
            Post Job
          </button>
        </form>
      </div>)} <ToastContainer />
    </BaseLayout>):<p>session expired</p>}</div>
  );
};

export default PostJobs;
