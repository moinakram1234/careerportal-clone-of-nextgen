import React, { useState,useEffect } from 'react';
import BaseLayout from "@/components/Baselayout";
import NoSSR from "react-no-ssr";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
import ApplicationForm from "@/components/applicationform";
import Modal from '@/components/modal';
import { fetchJobPosts } from '@/server_requests/client_requests';
const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const Career = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobPosts, setJobPosts] = useState(false);
  const handleApplyNow = (index) => {
    // Add your logic for handling the "Apply Now" button click
    setIsModalOpen(true);
    console.log("Applying for job post:", jobPosts[index]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchJobPosts();
      setJobPosts(data);
    };

    fetchData();
  }, []);
   // The empty dependency array ensures that this effect runs once, similar to componentDidMount

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return formattedDate;
  };

  return (
    <div>
      <BaseLayout>
        <div className="relative h-72 w-full">
          <img
            className="h-full w-4/5 ml-36 bg-no-repeat bg-center rounded"
            src="cover.jpg"
            alt="cover image"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Typewriter effect */}
            <NoSSR>
              <div
                className="text-5xl text-white font-signature rounded"
                style={{ backgroundColor: "#005794" }}
              >
                <Typewriter
                  options={{
                    strings: ["Join the Team"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
            </NoSSR>

            <h5 className="text-white">
              Relaxed Atmosphere, Best Working Environment, Top Notch
              Projects...
            </h5>
          </div>
        </div>
        <h1 className="text-4xl font-bold mt-5 font-signature text-gray-500 text-center">
          Available Jobs
        </h1>

        {/* Add the job search fields and button here */}
        <div className="w-3/5 mx-auto">
          {jobPosts && jobPosts.map((jobPost, index) => (
            <div
              key={index}
              className="border pb-10 pt-5 pl-5 rounded-xl my-4 flex flex-col relative"
            >
              <div>
                <h3 className="text-xl font-bold">{jobPost.jobtitle}</h3>
                <ReactQuill
                  readOnly={true}
                  theme={"bubble"}
                  value={jobPost.description || ""}
                />
                <div className="flex p-3 text-center">
                  <div
                    className="mr-4 rounded-2xl text-gray-800 w-28 h-9 pt-2"
                    style={{ backgroundColor: "#F8FAFC" }}
                  >
                    {jobPost.jobtype}
                  </div>
                  <div
                    className="mr-4 rounded-2xl text-gray-800 bg-gray-300 w-28 h-9 pt-2"
                    style={{ backgroundColor: "#F8FAFC" }}
                  >
                    {jobPost.joblocation}
                  </div>
                  <div
                    className="mr-4 rounded-2xl text-gray-800 bg-gray-300 w-52 h-9 pt-2"
                    style={{ backgroundColor: "#F8FAFC" }}
                  >
                    {formatCreatedAt(jobPost.createdAt)}
                  </div>
                </div>
              </div>
              {/* Apply Now button */}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded absolute bottom-2 right-2 hover:bg-blue-600"
                onClick={() => handleApplyNow(index)}
              >
                Apply Now
              </button>
          
            </div>
          ))}
          {isModalOpen && (
            <Modal onClose={handleCloseModal}>
              <ApplicationForm onClose={handleCloseModal} />
            </Modal>
          )}
        </div>
      </BaseLayout>
    </div>
  );
};


export default Career;
