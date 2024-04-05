// JobDetails.js
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import {
  BaseLayout,
  Loader,
  useRouter,
  BottomSection,
  fetchJobPostDetails,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TwitterIcon,
  dynamic,
  FaLocationCrosshairs,
  WiTime5,
  PiBagSimpleFill,
  Button,
} from "@/components/export_libraries/exportlibrary";
import Relative_Post from "./relative-post/relative_post";
import { useMediaQuery } from "@chakra-ui/react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const JobDetails = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 1080px)");
  const router = useRouter();
  const [jobDetails, setJobDetails] = useState(null);
  const [postid, setPostId] = useState(router.query.postid || "");
  const [isLoading, setIsLoading] = useState(true);

  const handleRelativePostClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleApplyNow = (id) => {
    // Add your logic for handling the "Apply Now" button click
    router.push(`/applyapplication?postid=${id}`);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const fetchData = async () => {
      const details = await fetchJobPostDetails(postid);
      setJobDetails(details);
    };

    fetchData();
    // fetchPosts();
  }, []);

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
  // const handleApp = (postId) => {
  //   // Push the post ID to the path "postdetails"
  //   router.push(`/jobdetails?postid=${postId}`);
  // };

  const shareUrl = `localhost:3000/jobdetails?postid=${jobDetails._id}`;
  const shareTitle = `New Job Alert! Exciting Opportunity. ${jobDetails.jobtitle} at Haidri Beverages in ${jobDetails.joblocation} 🚀 Join our dynamic team and be a part of something extraordinary. Apply now and take the next step in your career journey! #hiring #JobOpening @CareerOpportunity `;

  return (
    <BaseLayout>
      <div className=" mt-24  ">
        <div className="pl-5 text-center justify-center flex  ">
          <div className="flex gap-5 ">
            <div className={`${isLargerThan800 ? "w-[30%]  " : "hidden"}`}>
              <h1 className="text-3xl font-semibold text-left rounded-t-2xl   bg-[#E8F0FE]  p-3">
                Related Jobs
              </h1>
              <div className="lg:flex p-10 overflow-auto h-[90%]  font-semibold mb-4 bg-[#E8F0FE] rounded-b-2xl  justify-between">
                <Relative_Post
                  setJobDetails={setJobDetails}
                  jobDetails={jobDetails}
                  onReadMoreClick={handleRelativePostClick}
                />
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center w-full ">
                <div className="filterloading"></div>
              </div>
            ) : (
              <div className={`job-description ${isLargerThan800 ? "w-2/3" : ""}`}>
                <div className="  w-full  ">
                  <div
                    className={`${
                      isLargerThan800
                        ? "text-3xl text-white flex bg-[#2E3192] p-5 font-semibold mb-4  rounded-lg   justify-between"
                        : "text-xl text-white  bg-[#2E3192] p-5 w-[95%] font-semibold mb-10   rounded-lg   "
                    }`}
                  >
                    <div className="flex justify-start">
                      {" "}
                      {jobDetails.jobTitle}
                    </div>
                    <div
                      className={`${
                        isLargerThan800
                          ? "flex mr-4 gap-5"
                          : "flex mr-4 gap-5 mt-5"
                      }`}
                    >
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
                      <Button
                        className={`  text-[#504ED7]  p-2 rounded bg-white   text-sm lg:text-base right-2 hover:text-black`}
                        onClick={() => handleApplyNow(jobDetails._id)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                  {jobDetails ? (
                    <div >
                      <div className="lg:flex ">
                        <h3 className="text-xl pl-5 font-semibold p-5 flex">
                          Job Description
                        </h3>
                        <div
                          className={`lg:flex  gap-5 pl-5 justify-center p-5 `}
                        >
                          <div className={`flex gap-5   `}>
                            <PiBagSimpleFill size={20} />
                            <p className="text-gray-500">
                              {" "}
                              {jobDetails.jobType}
                            </p>
                          </div>
                          <div className={` flex gap-5`}>
                            <FaLocationCrosshairs size={20} />
                            <p className="text-gray-500">
                              {" "}
                              {jobDetails.jobLocation}
                            </p>
                          </div>
                          <div className={` flex gap-5 `}>
                            <WiTime5 size={20} />
                            <p className="text-gray-500">
                              {formatCreatedAt(jobDetails.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700  ">
                        <ReactQuill
                          className=" mx-auto" // Add mx-auto to center the ReactQuill component
                          readOnly={true}
                          theme="bubble"
                          value={jobDetails.description}
                        />
                      </p>
                    </div>
                  ) : (
                    <p className="text-xl mt-4">Job details not found</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <br></br>
        <br></br>
        {/* {isModalOpen && (
        <ApplicationForm onClose={handleCloseModal} postid={postid} />
      )} */}
        <div
          className={`${
            isLargerThan800 ? "hidden" : "bg-[#E8F0FE] rounded-b-lg"
          }`}
        >
          {" "}
          <Relative_Post
            setJobDetails={setJobDetails}
            jobDetails={jobDetails}
            onReadMoreClick={handleRelativePostClick}
          />
        </div>
        <BottomSection />
      </div>
    </BaseLayout>
  );
};

export default JobDetails;
