import React, { useState, useEffect } from "react";
import BaseLayout from "@/components/Baselayout";
import NoSSR from "react-no-ssr";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
import ApplicationForm from "@/components/applicationform";
import { fetchJobPosts } from "@/server_requests/client_requests";
// import Slider from "react-slick";
// import Image from "next/image";
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

  return (
    <div>
      <BaseLayout>
        <div className="relative h-72 w-full">
          <img
            className="block mx-auto h-full w-96 sm:w-4/5 lg:w-4/5  bg-no-repeat bg-center rounded"
            src="cover.jpg"
            alt="cover image"
          />
          {/* <Slider {...settings}>
            {imageArray.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
              />
            ))}
          </Slider> */}

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Typewriter effect */}
            <NoSSR>
              <div
                className="text-3xl lg:text-4xl text-white font-signature rounded"
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

            <h5 className="text-white text-center w-52 text-sm sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
              Relaxed Atmosphere, Best Working Environment, Top Notch
              Projects...
            </h5>
          </div>
        </div>

        {/* ... your existing code ... */}
        <div className="w-5/6 mx-auto overflow-y-auto ">
          {jobPosts &&
            jobPosts.map((jobPost, index) => (
              <div key={index}>
                <div
                  className="rounded-t-xl"
                  style={{ backgroundColor: "#005896", marginTop: "10px" }}
                >
                  <h3 className="text-lg lg:text-xl text-white p-2 lg:p-5 font-bold">
                    {jobPost.jobtitle}
                  </h3>
                </div>
                <div className="border pb-10 pt-5 pl-5 rounded-b-xl relative">
                  <div>
                    <ReactQuill
                      readOnly={true}
                      theme={"bubble"}
                      value={jobPost.description || ""}
                    />
                    <div className="flex  sm:flex-row p-3 text-center">
                      <div
                        className="mb-4 sm:mr-4 sm:mb-0 rounded-2xl text-sm w-20 text-gray-800 sm:w-full md:w-32 lg:w-36 xl:w-52 h-9 pt-2"
                        style={{ backgroundColor: "#F8FAFC" }}
                      >
                        {jobPost.jobtype}
                      </div>
                      <div
                        className="mb-4 sm:mr-4 sm:mb-0 rounded-2xl text-sm w-20 text-gray-800 sm:w-full md:w-32 lg:w-36 xl:w-52 h-9 pt-2"
                        style={{ backgroundColor: "#F8FAFC" }}
                      >
                        {jobPost.joblocation}
                      </div>
                      <div
                        className="sm:w-full md:w-44 lg:w-52 xl:w-64  text-xs w-32 rounded-2xl text-gray-800 bg-gray-300 h-9 pt-2"
                        style={{ backgroundColor: "#F8FAFC" }}
                      >
                        {formatCreatedAt(jobPost.createdAt)}
                      </div>
                    </div>
                  </div>
                  {/* Apply Now button */}
                  <button
                    className="bg-blue-500 text-white py-1 lg:py-2 text-sm w-20  rounded absolute bottom-2 right-2 hover:bg-blue-600"
                    onClick={() => handleApplyNow(index)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          {isModalOpen && <ApplicationForm onClose={handleCloseModal} />}
        </div>
      </BaseLayout>
    </div>
  );
};
export default Career;
