// JobDetails.js
import React, { useEffect, useState } from "react";
import {
  fetchJobPostDetails,
  fetchJobPosts,
} from "@/server_requests/client_requests";
// ...
import { NextSeo } from "next-seo";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton, // Corrected import
  TwitterShareButton,
} from "next-share";

import {
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon, // Corrected import
  TwitterIcon,
} from "next-share";

// ...

import { useRouter } from "next/router";
import NoSSR from "react-no-ssr";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
import ApplicationForm from "@/components/applicationform";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { WiTime5 } from "react-icons/wi";
import { PiBagSimpleFill } from "react-icons/pi";
import styles from "@/styles/Home.module.css";
import { FcNext, FcPrevious } from "react-icons/fc";
import BottomSection from "@/components/bottomsection";
import Loader from "@/components/loader";
import Head from "next/head";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const JobDetails = () => {
  const router = useRouter();
  const [jobDetails, setJobDetails] = useState(null);
  const [jobPosts, setJobPosts] = useState([]);
  const cardsPerPage = 3;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleApplyNow = (index) => {
    // Add your logic for handling the "Apply Now" button click
    setIsModalOpen(true);
    setPostid(jobPosts[index].id);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };
  useEffect(() => {
    const { postid } = router.query;

    const fetchData = async () => {
      const details = await fetchJobPostDetails(postid);
      setJobDetails(details);
    };

    const fetchPosts = async () => {
      const posts = await fetchJobPosts();
      setJobPosts(posts);
    };

    fetchData();
    fetchPosts();
  }, [router.query]);

  if (!jobDetails) {
    // Loading state or handle error
    return <Loader />;
  }
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };
  const handleApp = (postId) => {
    // Push the post ID to the path "postdetails"
    router.push(`/jobdetails?postid=${postId}`);
  };

  const shareUrl = `192.168.137.1:3000/jobdetails?postid=${jobDetails.id}`;
  const shareTitle = `New Job Alert! Exciting Opportunity. ${jobDetails.jobtitle} at Haidri Beverages in ${jobDetails.joblocation} 🚀 Join our dynamic team and be a part of something extraordinary. Apply now and take the next step in your career journey! #hiring #JobOpening @CareerOpportunity `;

  return (
    <div className=" min-w-full md:ml-5  pt-2 bg-white">
     <div className="flex gap-5 " >
     <img src="/logo.png" className="ml-5 pb-5 w-20" />
     <span className="text-2xl   font-semibold pt-4 text-gray-600">Haidri Beverages Pvt. Ltd.</span>
     </div>
      {/* <NextSeo
        title={jobDetails.jobtitle}
        description={jobDetails.description.substring(0, 150)}
        openGraph={{
          title: jobDetails.jobtitle,
          description: jobDetails.description.substring(0, 150),
          url: shareUrl,
          type: "article",
          images: [
            { url: "https://www.example.ie/og-image.jpg" }, // Generic OG image
            {
              url: "https://www.example.ie/whatsapp-og-image.jpg",
              width: 800,
              height: 600,
              alt: "WhatsApp Image",
            }, // WhatsApp-specific OG image
          ],
        }}
      /> */}
      <h2 className="text-3xl lg:flex pl-10  p-5 font-semibold mb-4 bg-gray-400 justify-between rounded-lg">
        {jobDetails.jobtitle}
        {jobPosts.length > 0 && (
          <div className="flex mr-20 gap-5">
            <FacebookShareButton url={shareUrl} quote={shareTitle}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <LinkedinShareButton url={shareUrl} title={shareTitle}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
            <TwitterShareButton url={shareUrl} title={shareTitle}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={shareUrl}
              title={shareTitle}
              separator=":: "
              imageUrl="https://www.example.ie/whatsapp-og-image.jpg" // WhatsApp-specific OG image
            >
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
          </div>
        )}
      </h2>
      <div className="pl-5 ">
        <div>
          <h3 className="text-xl pl-5 font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700">
            <ReactQuill
              className={` `}
              readOnly={true}
              theme={"bubble"}
              value={jobDetails.description}
            />
          </p>
          <div className={`lg:flex space-y-5 gap-5 pl-4  `}>
            <div className={`flex gap-5   `}>
              <PiBagSimpleFill size={20} />
              {jobDetails.jobtype}
            </div>
            <div className={` flex gap-5`}>
              <FaLocationCrosshairs size={20} />
              {jobDetails.joblocation}
            </div>
            <div className={` flex gap-5 `}>
              <WiTime5 size={20} />
              {formatCreatedAt(jobDetails.createdAt)}
            </div>
            <div className="flex mt-3 "></div>
          </div>
        </div>
        <div>
          <div className={`lg:w-4/5 w-full mx-auto overflow-y-auto mt-28`}>
            <h3 className="text-center mt-10 mb-10 text-5xl text-gray-500">
              {jobPosts.length > 0 ? "Available Jobs" : "No Jobs Found"}
            </h3>
            <div className="flex flex-wrap ">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`mr-2  rounded-lg `}
              >
                <FcPrevious size={30} />
              </button>
              {jobPosts &&
                jobPosts
                  .slice(
                    currentPage * cardsPerPage,
                    (currentPage + 1) * cardsPerPage
                  )
                  .map((jobPost, index) => (
                    <div
                      key={index}
                      className={`lg:w-96 w-[100%] mx-4 my-1 hover:shadow-2xl ${styles.card}`}
                    >
                      <div className={` pb-10 pt-5 pl-2 pr-2 mb-4  h-96 `}>
                        <h3 className={` text-gray-500  `}>
                          {jobPost.jobtitle}
                        </h3>
                        <div className={``}>
                          <ReactQuill
                            className={` `}
                            readOnly={true}
                            theme={"bubble"}
                            value={`${jobPost.description.substring(
                              0,
                              100
                            )}...`}
                          />
                          <div className={``}>
                            {/* {!expandedDescriptions[index] && (
                          <button
                            className={`${styles.readMoreButton} ${
                              darkMode ? styles.textBlue500 : styles.textBlue500
                            }`}
                            onClick={() => handleReadMore(index)}
                          >
                            Read More
                          </button>
                        )}
                        {expandedDescriptions[index] && (
                          <button
                            className={`${styles.readMoreButton} ${
                              darkMode ? styles.textBlue500 : styles.textBlue500
                            }`}
                            onClick={() => handleReadMore(index)}
                          >
                            Read Less
                          </button>
                        )} */}
                          </div>
                          <div className={`flex flex-col m-2 `}>
                            <div className={`flex gap-5   `}>
                              <PiBagSimpleFill size={20} />
                              {jobPost.jobtype}
                            </div>
                            <div className={` mt-5 flex gap-5`}>
                              <FaLocationCrosshairs size={20} />
                              {jobPost.joblocation}
                            </div>
                            <div className={` mt-5 flex gap-5 `}>
                              <WiTime5 size={20} />
                              {formatCreatedAt(jobPost.createdAt)}
                            </div>
                            <div className="flex mt-3 ">
                              <button
                                onClick={() => handleApp(jobPost.id)}
                                className=" p-2 rounded-lg text-white bg-black"
                              >
                                read more
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <button
                          style={{ backgroundColor: "red" }}
                          className={`text-white py-1 lg:py-2 text-sm w-20 rounded bottom-2 right-2 hover:bg-blue-600`}
                          onClick={() => handleApplyNow(index)}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
              <button
                onClick={handleNextPage}
                disabled={(currentPage + 1) * cardsPerPage >= jobPosts.length}
                className={` rounded-lg  `}
              >
                <FcNext size={30} />
              </button>
            </div>

            <br></br>
            {isModalOpen && (
              <ApplicationForm onClose={handleCloseModal} postid={postid} />
            )}
          </div>
        </div>
      </div>
      <BottomSection />
    </div>
  );
};

export default JobDetails;
