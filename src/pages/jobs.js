import React, { useEffect, useState } from "react";
import BottonSection from "@/components/bottomsection";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/router";
import BaseLayout from "@/components/Baselayout";
import { RiFilter3Line } from "react-icons/ri";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
import {
  Box,
  HStack,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import {
  Select,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { isTokenExpired } from "./tokenUtils";
import { fetchJobPosts } from "@/server_requests/client_requests";
import { FaFilter } from "react-icons/fa";
import { BsFillBookmarkFill } from "react-icons/bs";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export default function JobsCard() {
  const [jobPosts, setJobPosts] = useState(false);
  const [jobPosts_M, setJobPosts_M] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const darkMode = useSelector((state) => state.darkMode);
  const [postid, setPostid] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const { data: session } = useSession();
  const [usertoken, setUsertoken] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedJobLocation, setSelectedJobLocation] = useState("");
  const [selectedJobDate, setSelectedJobDate] = useState("");

  const openChatbotModal = () => {
    setIsChatbotModalOpen((prevState) => !prevState);
  };

  const closeChatbotModal = () => {
    setIsChatbotModalOpen(false);
  };
  const handleApplyNow = (id) => {
    // Add your logic for handling the "Apply Now" button click
    router.push(`/applyapplication?postid=${id}`);

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
  const handleApp = (postId) => {
    // Push the post ID to the path "postdetails"
    router.push(`/jobdetails?postid=${postId}`);
  };

  const handleJobTypeChange = (event) => {
    setSelectedJobType(event.target.value);
  };

  const handleJobLocationChange = (event) => {
    setSelectedJobLocation(event.target.value);
  };

  const handleJobDateChange = (event) => {
    setSelectedJobDate(event.target.value);
  };
  const router = useRouter();
  const sizes = [
    { type: "Job Type", value: selectedJobType },
    { type: "Job Location", value: selectedJobLocation },
    { type: "Job Date", value: selectedJobDate },
  ];
  const handleRemoveTag = (indexToRemove) => {
    switch (indexToRemove) {
      case "Job Type":
        setSelectedJobType("");
        break;
      case "Job Location":
        setSelectedJobLocation("");
        break;
      case "Job Date":
        setSelectedJobDate("");
        break;
      case "clearall":
        setSelectedJobDate("");
        setSelectedJobLocation("");
        setSelectedJobType("");
        break;
      default:
        break;
    }
  };

  return (
    <BaseLayout>
      <div className="bg-[#F5F5F5] border-b ">
        <div className="   pb-14  mt-5 pt-20 ">
      <div className=" justify-center flex mt-3">
      <div>
      <h1 className='md:text-6xl text-2xl sm:text-2xl font-extrabold mb-4 text-black '>To Choose <span className='text-indigo-600'>Right Jobs.</span> </h1>
      <p className='md:text-lg sm:text-sm text-xs mb-5 text-gray-400'>2400 Peoples are daily search in this portal, 100 user added job portal!</p>
      </div>
      </div>
          <div className="  flex justify-center  ml-3 lg:ml-10 mb-5 lg:w-2/5 lg:mt-0">
            <Input
              placeholder="Search for jobs"
              style={{ backgroundColor: "#F5F5F5" }}
              className="border-b border-[#000000] px-0 py-2 w-[90%] lg:w-full focus:outline-none focus:border-b-2 focus:border-indigo-400"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {/* Dropdown menus for jobType, jobLocation, and jobDate */}

          <div className="flex  gap-5 lg:ml-10  w-full">
            
          <div className='flex items-center justify-center'>
              <BsFillBookmarkFill className='text-indigo-600 text-xl mx-2' />
              <h1 className='font-semibold text-lg'>Suggest Tag : </h1>
            </div>
            <Menu>
              <MenuButton
                className="text-xs lg:text-sm  text-gray-500"
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                {selectedJobType ? selectedJobType : "Select Job Type"}
              </MenuButton>
              <MenuList className="bg-white rounded p-5">
                <MenuItem
                  className="hover:text-[#2E3192] hover:bg-[#F3F4F6] hover:rounded hover:p-1"
                  onClick={() => setSelectedJobType("")}
                >
                  All Job Types
                </MenuItem>
                {jobPosts_M &&
                  [
                    ...new Set(jobPosts_M.map((jobPost) => jobPost.jobType)),
                  ].map((jobType, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => setSelectedJobType(jobType)}
                      className="m-3 hover:text-[#2E3192] hover:bg-[#F3F4F6] hover:rounded hover:p-1"
                    >
                      {jobType}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                className="text-xs lg:text-sm  text-gray-500"
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                {selectedJobLocation
                  ? selectedJobLocation
                  : "Select Job Location"}
              </MenuButton>
              <MenuList className="bg-white rounded p-5">
                <MenuItem
                  onClick={() => setSelectedJobLocation("")}
                  className="hover:text-[#2E3192]  hover:bg-[#F3F4F6] hover:rounded hover:p-1"
                >
                  All Job Locations
                </MenuItem>
                {jobPosts_M &&
                  [
                    ...new Set(
                      jobPosts_M.map((jobPost) => jobPost.jobLocation)
                    ),
                  ].map((jobLocation, index) => (
                    <MenuItem
                      className="hover:text-[#2E3192] hover:bg-[#F3F4F6] hover:rounded hover:p-1 m-3"
                      key={index}
                      onClick={() => setSelectedJobLocation(jobLocation)}
                    >
                      {jobLocation}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                className="text-xs lg:text-sm  text-gray-500"
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                {selectedJobDate ? selectedJobDate : "Select Job Date"}
              </MenuButton>
              <MenuList className="bg-white rounded  p-5">
                <MenuItem
                  onClick={() => setSelectedJobDate("")}
                  className="hover:text-[#2E3192] hover:bg-[#F3F4F6] hover:rounded hover:p-1"
                >
                  All Job Dates
                </MenuItem>
                {/* Adjust this logic based on your actual date data */}
                {jobPosts_M &&
                  [
                    ...new Set(jobPosts_M.map((jobPost) => jobPost.createdAt)),
                  ].map((jobDate, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => setSelectedJobDate(jobDate)}
                      className="hover:text-[#2E3192] hover:bg-[#F3F4F6] hover:rounded hover:p-1 m-3"
                    >
                      {/* You may need to format the date as per your requirements */}
                      {formatCreatedAt(jobDate)}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>

      <div className="flex mt-3 justify-center  ">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-1 w-[70%] ">
          <HStack className="ml-10 pb-10 pt-10">
            {/* Display individual tags */}
            {sizes
              .filter((size) => size.value) // Filter out empty strings
              .map((size, index) => (
                <Tag
                  size={size.value}
                  key={index}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="green"
                  className=" p-2 rounded-full gap-3  bg-[#E0E0E0]"
                >
                  <TagLabel className="text-sm">{size.value}</TagLabel>
                  <TagCloseButton
                    onClick={() => handleRemoveTag(size.type)}
                    className="hover:text-red-600"
                  />
                </Tag>
              ))}

            {/* Display Clear All tag */}
            {sizes.some((size) => size.value) && ( // Check if there are any selected tags
              <Tag
                size="md" // Adjust the size as needed
                borderRadius="full"
                variant="solid"
                colorScheme="green"
                className=" p-2 rounded-full gap-3  bg-[#E0E0E0]"
              >
                <TagLabel>Clear All</TagLabel>
                <TagCloseButton
                  onClick={() => handleRemoveTag("clearall")}
                  className="hover:text-red-600"
                />
              </Tag>
            )}
          </HStack>
      
          {jobPosts_M &&
            jobPosts_M
              .filter(
                (jobPost) =>
                  // Filter based on search input
                  jobPost.jobTitle
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  jobPost.jobType
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  jobPost.jobLocation
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  jobPost.description
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
              )
              .filter(
                (jobPost) =>
                  // Filter based on selected jobType, jobLocation, and jobDate
                  (selectedJobType
                    ? jobPost.jobType === selectedJobType
                    : true) &&
                  (selectedJobLocation
                    ? jobPost.jobLocation === selectedJobLocation
                    : true) &&
                  (selectedJobDate
                    ? jobPost.createdAt === selectedJobDate
                    : true)
              )
              .map((jobPost, index) => (
                <div className="p-10 hover:bg-[#F5F5F5] border-b">
                <div className="   cursor-pointer  rounded  transition-all duration-1000  md:w-full   px-2 md:flex md:flex-wrap">
                   <div className=" flex  items-center  ">
                     <img
                       width={60}
                       height={60}
                       className="flex rounded-full "
                       src="/images/image-victor.png"
                       alt="no image"
                     />
                     <div className="flex ml-14 lg:ml-10 flex-col mx-2 ">
                      <h1 className="text-xl font-sans">{jobPost.jobTitle}</h1>
                       <p className="mt-2 text-gray-500 text-xs">{formatCreatedAt(jobPost.createdAt)}</p>
                     </div>
                   </div>
       
                   <div className="mb-2 flex   justify-center py-1 ">
                     <div className="flex  px-1 py-1 items-center justify-center ">
                       <p className="text-xs bg-blue-200 text-blue-700 px-3 py-1 rounded-full">
                        {jobPost.jobLocation}
                       </p>
                     </div>
                     <div className="flex px-1 py-1 items-center  justify-center">
                       <p className="text-xs bg-red-200 text-red-700 px-3 py-1 rounded-full">
                        {jobPost.jobType}
                       </p>
                     </div>
                   </div>
                  
                   <div className="mb-2 flex flex-col md:flex-wrap md:flex-row w-full h-full justify-between  items-center ">
              
                    <br></br>
                    <button onClick={()=>handleApp(jobPost._id)} className="view-jobs-button mb-10" style={{ backgroundColor: '#000000', color: 'white', padding: '15px 32px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px 20px 2px', cursor: 'pointer' }}>View Jobs</button> </div>
                 </div>
                </div>
              ))}
        </div>
      </div>
      <br></br>
      <br></br>
      <BottonSection />
    </BaseLayout>
  );
}


