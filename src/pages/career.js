import React, { useState, useEffect, useRef } from "react";
import BaseLayout from "@/components/Baselayout";
import NoSSR from "react-no-ssr";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
import ApplicationForm from "@/components/applicationform";
import { fetchJobPosts } from "@/server_requests/client_requests";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import ImageGallery from "./heroimage";
import { useRouter } from "next/router";
import { isTokenExpired } from "./tokenUtils";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { WiTime5 } from "react-icons/wi";
import { PiBagSimpleFill } from "react-icons/pi";
import Chatbot from "@/components/chatbot";
import styles from "@/styles/Home.module.css";
import { FaRobot } from "react-icons/fa";
import BottonSection from "@/components/bottomsection";
import { FcNext, FcPrevious } from "react-icons/fc";
// import Slider from "react-slick";
// import Image from "next/image";
const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { GrLinkNext } from "react-icons/gr";
const Career = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobPosts_M, setJobPosts_M] = useState(false);
  const [jobPosts, setJobPosts] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const darkMode = useSelector((state) => state.darkMode);
  const [postid, setPostid] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const jobPostsContainerRef = useRef(null);
  const { data: session } = useSession();
  const router = useRouter();
  const [usertoken, setUsertoken] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);

  const isMobile = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth <= 768; // Adjust the breakpoint as needed
      setCurrentPage(0); // Reset current page on window resize
    };
    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const openChatbotModal = () => {
    setIsChatbotModalOpen((prevState) => !prevState);
  };

  const closeChatbotModal = () => {
    setIsChatbotModalOpen(false);
  };

  const handleApplyNow = (index) => {
    // Add your logic for handling the "Apply Now" button click
    setIsModalOpen(true);
    setPostid(jobPosts[index].id);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUsertoken(token);

    //if token expire
    if (!session) {
      if (!token) {
        router.push("/");
      }
      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        router.push("/");
      }
    }

    const fetchData = async () => {
      const data = await fetchJobPosts();
      const filteredData = data.filter((jobPost) => jobPost.enable === true);

      setJobPosts(filteredData);
      setJobPosts_M(filteredData);
      setExpandedDescriptions(Array(data.length).fill(false));
    };

    fetchData();
  }, [usertoken, session]);
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
    });
    return formattedDate;
  };

  const handleSearch = () => {
    // Filter job posts based on the search query and display them
    const filteredJobs = jobPosts.filter((jobPost) =>
      jobPost.jobtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setJobPosts_M(filteredJobs);
    if (jobPostsContainerRef.current) {
      jobPostsContainerRef.current.scrollIntoView({ behavior: "smooth" });
      jobPostsContainerRef.current.focus();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // Update the search query when a suggestion is clicked
    setSearchQuery(suggestion);
    // Clear suggestions
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    // Update the search query and fetch suggestions based on the input value
    const inputValue = e.target.value;
    setSearchQuery(inputValue);

    const suggestedJobs = jobPosts
      .filter((jobPost) =>
        jobPost.jobtitle.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((jobPost) => jobPost.jobtitle);

    if (inputValue) {
      setSuggestions(suggestedJobs);
    } else {
      setSuggestions([]);
    }
  };

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  // const imageArray = [
  //   { src: "/image1.jpg", alt: "Image 1", width: 500, height: 300 },
  //   { src: "/image2.jpg", alt: "Image 2", width: 500, height: 300 },
  //   { src: "/image3.jpg", alt: "Image 3", width: 500, height: 300 },
  //   { src: "/image4.jpg", alt: "Image 4", width: 500, height: 300 },
  //   { src: "/image5.jpg", alt: "Image 5", width: 500, height: 300 },
  //   // Add more image data as needed
  // ];
  const handleReadMore = (index) => {
    // Toggle the expanded state for the clicked job post
    const updatedExpandedDescriptions = [...expandedDescriptions];
    updatedExpandedDescriptions[index] = !updatedExpandedDescriptions[index];
    setExpandedDescriptions(updatedExpandedDescriptions);
  };
  const handleApp = (postId) => {
    // Push the post ID to the path "postdetails"
    router.push(`/jobdetails?postid=${postId}`);
  };

  const cardsPerPage = isMobile.current ? 4 : 3;
  return (
    <div>
      {(session || usertoken) && (
        <BaseLayout>
          <div
            style={{ height: "600px" }}
            className={`w-full ${darkMode ? "" : "white"}`}
          >
            <div className=" ">
              <ImageGallery />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <NoSSR>
                <div
                  className={`text-3xl lg:text-5xl text-white font-signature rounded ${styles.backgroundColorBlue}`}
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

              <h5 className="text-white text-center text-sm w-4/5  lg:text-lg sm:w-3/4 md:w-2/2 lg:w-2/3 xl:w-2/4 mx-auto">
                Relaxed Atmosphere, Best Working Environment, Top Notch
                Projects...
              </h5>
              <br></br>
              <br></br>
              <div className="flex items-center  h-10 lg:w-2/4 lg:h-14 justify-center ">
                <input
                  type="text"
                  placeholder="Search for Job title"
                  className={`border border-white w-3/5 h-full pl-5 rounded-l-lg `}
                  required
                  value={searchQuery}
                  onChange={handleInputChange}
                  ref={inputRef}
                />
                <button
                  className={`bg-blue-900 text-white h-full w-32 rounded-r-lg `}
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              {suggestions.length > 0 && (
                <ul
                  className={`suggestions-list bg-white mr-32 rounded-b-lg pl-3 pt-2 space-y-2 w-[30.1%] `}
                >
                  {suggestions.map((suggestion, index) => (
                    <li
                      className="hover:bg-gray-100 cursor-pointer"
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={`fixed bottom-4  lg:w-[35%]  right-4 mr-5 `}>
              {isChatbotModalOpen && <Chatbot closechat={closeChatbotModal} />}
              <div className="w-full  justify-end flex ">
                <button
                  className={`shadow-lg  justify-end flex bg-white rounded-lg p-2 `}
                  onClick={openChatbotModal}
                >
                  <FaRobot size={40} />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={jobPostsContainerRef}
            className={`lg:w-4/5 w-80  mx-auto  mt-28`}
          >
            <h3 className="text-center mt-10 mb-10 lg:text-5xl font-bold text-gray-500 text-2xl">
              {jobPosts.length > 0 ? "Available Jobs" : "No Jobs Found"}
            </h3>
            <div className="lg:flex  w-full lg:flex-wrap ">
              {currentPage !== 0 && (
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === jobPosts_M.length}
                  className={`mr-2  rounded-lg `}
                >
                  <FcPrevious size={30} />
                </button>
              )}

              {jobPosts_M &&
                jobPosts_M
                  .slice(
                    currentPage * cardsPerPage,
                    (currentPage + 1) * cardsPerPage
                  )
                  .map((jobPost, index) => (
                    <div
                      key={index}
                      className={`lg:w-96  my-1 bg-white  ${styles.card} `}
                    >
                      <div
                        className={` flex flex-col justify-between  p-5  ${
                          darkMode ? "bg-gray-800" : "bg-white"
                        } rounded-lg  hover:shadow-2xl h-full `}
                      >
                        <span
                          className={`w-full text-[#4285F4]  ${
                            darkMode ? "text-white" : ""
                          }`}
                          style={{
                           // textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                            //WebkitTextStroke: " #6B7280",
                            WebkitTextFillColor: darkMode ? "white" : "#4285F4",
                          }}
                        >
                          <button
                            onClick={() => handleApp(jobPost.id)}
                            className={` flex p-2 text-2xl rounded-lg  gap-5`}
                          >
                            {" "}
                            {jobPost.jobtitle}
                           <div className="mt-2">
                           <GrLinkNext size={20} />
                           </div>
                          </button>
                        </span>

                        <div className={` `}>
                          <ReactQuill
                            className={`${darkMode ? "text-white" : ""} z-10  `}
                            readOnly={true}
                            theme={"bubble"}
                            value={
                              expandedDescriptions[index]
                                ? jobPost.description || ""
                                : jobPost.description
                                ? `${jobPost.description.substring(0, 50)}...`
                                : ""
                            }
                          />
                          <div className={` `}>
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
                          <div
                            className={`lg:flex lg:space-y-0 space-y-3 text-gray-600 mt-10   ${
                              darkMode ? "text-white" : ""
                            } `}
                          >
                            <div
                              className={`flex   rounded-lg ${
                                darkMode ? "text-white" : ""
                              } gap-3 lg:ml-3  text-[14px]   `}
                            >
                              <PiBagSimpleFill size={15} />
                              {jobPost.jobtype}
                            </div>
                            <div
                              className={` ${
                                darkMode ? "text-white" : ""
                              } gap-3 flex lg:ml-3 text-[14px] `}
                            >
                              <FaLocationCrosshairs size={15} />
                              {jobPost.joblocation}
                            </div>
                            <div
                              className={` ${
                                darkMode ? "text-white" : ""
                              }gap-3 flex lg:ml-3 text-[14px]  `}
                            >
                              <WiTime5 size={15} />
                              {formatCreatedAt(jobPost.createdAt)}
                            </div>
                          </div>
                        </div>
                        <div className=" justify-end flex">
                          <button
                            style={{}}
                            className={` mt-5 text-red-400    text-sm lg:text-base right-2 hover:text-black`}
                            onClick={() => handleApplyNow(index)}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              {currentPage * cardsPerPage + cardsPerPage <=
                jobPosts_M.length && (
                <button
                  onClick={handleNextPage}
                  disabled={
                    (currentPage + 1) * cardsPerPage >= jobPosts_M.length
                  }
                  className={`rounded-lg`}
                >
                  <FcNext size={30} />
                </button>
              )}
            </div>

            <br></br>
            {isModalOpen && (
              <ApplicationForm onClose={handleCloseModal} postid={postid} />
            )}
          </div>
        </BaseLayout>
      )}
      <BottonSection />
    </div>
  );
};

export default Career;
