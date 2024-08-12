import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import  {
  BottomSection,
  HStack,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ChevronDownIcon,
  useSession,
  useSelector,
  isTokenExpired,
  fetchJobPosts,
  BsClock,
  BsFillBookmarkFill,
  BiBriefcase,
  BiBuilding,
  BiLineChart,
  BiMap,
  FaPersonChalkboard,
  BaseLayout,
  Button
} from "@/components/export_libraries/exportlibrary";
import {  useMediaQuery } from '@chakra-ui/react'
import { updateEnableStatus } from "@/server_requests/client_requests";
export default function JobsCard() {
  const router = useRouter();
  const [jobPosts, setJobPosts] = useState(false);
  const [jobPosts_M, setJobPosts_M] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const darkMode = useSelector((state) => state.darkMode);
  const [searchInput, setSearchInput] = useState(router.query.tag || "");
  const { data: session } = useSession();
  const [usertoken, setUsertoken] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedexperiencelevel, setSelectedexperiencelevel] = useState("");
  const [selectedJobDate, setSelectedJobDate] = useState("");
  const [filterLoading, setFilterLoading] = useState(true);
  const [isLargerThan1080] = useMediaQuery('(min-width: 1080px)')
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

    // //if token expire
    // if (!session) {
    //   if (!token) {
    //     router.push("/");
    //   }
    //   if (isTokenExpired(token)) {
    //     localStorage.removeItem("token");
    //     router.push("/");
    //   }
    // }

    const fetchData = async () => {
      const data = await fetchJobPosts();


      await Promise.all(data.map(async (jobPost) => {
        const deadlineDate = new Date(jobPost.submissionDeadline);
        const currentDate = new Date();
        
        if (deadlineDate < currentDate && jobPost.enable === true) {
            // If the deadline has passed, update the enable statusss
            await updateEnableStatus(jobPost._id, false);
        }
    }));
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
    // Store the post ID in localStorage
    localStorage.setItem('postId', postId);
    // Navigate to the login page
    router.push('/login');
  };

  const handleJobTypeChange = (event) => {
    setSelectedJobType(event.target.value);
  };

  const handleJobLocationChange = (event) => {
    setSelectedexperiencelevel(event.target.value);
  };

  const handleJobDateChange = (event) => {
    setSelectedJobDate(event.target.value);
  };

  const sizes = [
    { type: "Job Type", value: selectedJobType },
    { type: "Experience Level", value: selectedexperiencelevel },
    { type: "Job Date", value: selectedJobDate },
  ];
  const handleRemoveTag = (indexToRemove) => {
    switch (indexToRemove) {
      case "Job Type":
        setSelectedJobType("");
        break;
      case "Job Location":
        setSelectedexperiencelevel("");
        break;
      case "Job Date":
        setSelectedJobDate("");
        break;
      case "clearall":
        setSelectedJobDate("");
        setSelectedexperiencelevel("");
        setSelectedJobType("");
        break;
      default:
        break;
    }
  };
  const handlefilter = () => {

 
    if (!Array.isArray(jobPosts_M)) {
      return [];
    }
  
    return jobPosts_M
      .filter((jobPost) => {
        const { jobTitle, jobType, jobLocation, description, department, experienceLevel } = jobPost;
        const lowerCaseSearchInput = searchInput.toLowerCase();
        return (
          (jobTitle && typeof jobTitle === 'string' && jobTitle.toLowerCase().includes(lowerCaseSearchInput)) ||
          (experienceLevel && typeof experienceLevel === 'string' && experienceLevel.toLowerCase().includes(lowerCaseSearchInput)) ||
          (department && typeof department === 'string' && department.toLowerCase().includes(lowerCaseSearchInput)) ||
          (jobType && typeof jobType === 'string' && jobType.toLowerCase().includes(lowerCaseSearchInput)) ||
          (jobLocation && typeof jobLocation === 'string' && jobLocation.toLowerCase().includes(lowerCaseSearchInput)) ||
          (description && typeof description === 'string' && description.toLowerCase().includes(lowerCaseSearchInput))
        );
      })
      .filter(
        (jobPost) =>
          (selectedJobType ? jobPost.jobType === selectedJobType : true) &&
          (selectedexperiencelevel ? jobPost.experienceLevel === selectedexperiencelevel : true) &&
          (selectedJobDate ? jobPost.createdAt === selectedJobDate : true)
      );
  }
  
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    setFilterLoading(false);

    setTimeout(() => {
      setFilterLoading(true);
    }, 1000);
  };
  return (
    <BaseLayout>
      <div className="bg-[#F5F5F5] border-b ">
        <div className="   pb-14  mt-5 pt-20 ">
          <div className=" justify-center p-8  flex mt-3">
            <div >
              <h1 className={` ${isLargerThan1080?"text-6xl":"text-2xl justify-center flex gap-2"}  font-extrabold mb-4 text-black `}>
                To Choose <span className="text-[#2E3192]">Right Jobs.</span>{" "}
              </h1>
              <p className="md:text-lg sm:text-sm text-xs mb-5 text-gray-400">
                2400 Peoples are daily search in this portal, 100 user added job
                portal!
              </p>
            </div>
          </div>
          <div className="  flex justify-center  ml-3 lg:ml-10 mb-5 lg:w-2/5 lg:mt-0">
          <Input
      placeholder="Search for jobs"
      value={searchInput}
      style={{ backgroundColor: "#F5F5F5" }}
      className={`${isLargerThan1080?"border-b border-[#000000] px-0  py-2  lg:w-full focus:outline-none focus:border-b-2 focus:border-indigo-400":"w-[90%] py-2  focus:outline-none text-sm  border-b border-[#000000]"}  `}
      onChange={handleSearchInput}
    />
          </div>
          {/* Dropdown menus for jobType, jobLocation, and jobDate */}
          <div className={`${isLargerThan1080?"hidden":"flex justify-center pb-4 transition-all duration-1000  font-bold"}`}>
              <BsFillBookmarkFill className="text-[#24277a] text-xl mx-2" />
              <h1 className={`${isLargerThan1080?" font-semibold text-lg":"text-sm"}  `}>Suggest Tag  </h1>
            </div>


          <div className={`${isLargerThan1080?"flex  gap-5 lg:ml-10  w-full ":"m-3 gap-2 grid grid-cols-2"}`}>
            <div className={`${isLargerThan1080?"flex items-center justify-center ":"hidden"}`}>
              <BsFillBookmarkFill className="text-[#2E3192] text-xl mx-2" />
              <h1 className={`${isLargerThan1080?" font-semibold text-lg":"text-sm"}  `}>Suggest Tag : </h1>
            </div>
            <Menu>
              <MenuButton
                className={`${isLargerThan1080?" lg:text-sm  border p-2 text-gray-500":"text-xs p-2 border text-gray-500"}`}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                {selectedJobType ? selectedJobType : "Select Job Type"}
              </MenuButton>
              <MenuList className={`${isLargerThan1080?"bg-white border rounded p-5":"bg-white border rounded p-1 space-y-2"}`}>
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
                      className={`${isLargerThan1080?"hover:text-[#2E3192] hover:bg-[#F3F4F6] hover:rounded hover:p-1 m-3":"hover:text-[#2E3192] hover:bg-[#F3F4F6] hover:rounded text-[12px] hover:p-1"}`}
                    >
                      {jobType}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                className="text-xs lg:text-sm p-2 border text-gray-500"
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                {selectedexperiencelevel
                  ? selectedexperiencelevel
                  : "Select Experience Level"}
              </MenuButton>
              <MenuList className="bg-white border rounded p-5">
                <MenuItem
                  onClick={() => setSelectedexperiencelevel("")}
                  className="hover:text-[#2E3192]  hover:bg-[#F3F4F6] hover:rounded hover:p-1"
                >
                select All
                </MenuItem>
                {jobPosts_M &&
                  [
                    ...new Set(
                      jobPosts_M.map((jobPost) => jobPost.experienceLevel)
                    ),
                  ].map((experience, index) => (
                    <MenuItem
                      className="hover:text-[#2E3192] hover:bg-[#F3F4F6] hover:rounded hover:p-1 m-3"
                      key={index}
                      onClick={() => setSelectedexperiencelevel(experience)}
                    >
                      {experience}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>

            {/* <Menu>
              <MenuButton
                className="text-xs lg:text-sm border p-2 text-gray-500"
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                {selectedJobDate ? selectedJobDate : "Select Job Date"}
              </MenuButton>
              <MenuList className="bg-white rounded border  p-5">
                <MenuItem
                  onClick={() => setSelectedJobDate("")}
                  className="hover:text-[#2E3192] hover:bg-[#F3F4F6] hover:rounded hover:p-1"
                >
                  All Job Dates
                </MenuItem>
               
                {jobPosts_M &&
                  [
                    ...new Set(jobPosts_M.map((jobPost) => jobPost.createdAt)),
                  ].map((jobDate, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => setSelectedJobDate(jobDate)}
                      className="hover:text-[#2E3192] hover:bg-[#F3F4F6] hover:rounded hover:p-1 m-3"
                    >
                    
                      {formatCreatedAt(jobDate)}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu> */}
          </div>
        </div>
      </div>

      <div className={`${isLargerThan1080?"flex mt-3 justify-center":"flex mt-3 justify-center"}`}>
        <div className={`${isLargerThan1080?"grid grid-cols-1 gap-1 w-[70%]":"ml-5 mr-5 "}`}>
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

         {filterLoading ? (<div>
          {handlefilter(jobPosts_M).length > 0 ? 
           handlefilter(jobPosts_M).map((jobPost, index) => (
              <div key={index} className={`${isLargerThan1080?"p-3  hover:bg-[#2E3192] hover:text-white transition-all duration-1000 border-b ":"rounded-lg my-3 bg-[#DADADA] w-full hover:bg-[#2E3192] hover:text-white transition-all duration-1000 border-b "}`}>
                  <div className="cursor-pointerrounded   md:w-full px-2 md:flex md:flex-wrap justify-between">
                    <div className="flex p-3 items-center">
                      <img
                        width={60}
                        height={60}
                        className="flex rounded-full"
                        src="/images/image-victor.png"
                        alt="no image"
                      />
                      <div className="flex ml-14 lg:ml-10  flex-col mx-2">
                        <h1 className="text-xl font-sans">
                          <h1 className="text-xl font-sans">
                            {jobPost.jobTitle.slice(0, 20)+ '...'}
                          </h1>
                        </h1>
                        <p className="mt-2   text-xs">
                          {formatCreatedAt(jobPost.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className={`${isLargerThan1080?"mb-2 flex flex-col justify-center   py-1":"ml-20 mt-3 mb-2 flex flex-col justify-center   py-1"}`}>
                      <p  className="text-sm flex gap-4">
                        <BiMap  /> {jobPost.jobLocation}
                      </p>

                      <p style={{ marginTop: '5px' }} className="text-sm flex gap-5">
                        <BiBriefcase  /> {jobPost.jobType}
                      </p>

                      <p style={{ marginTop: '5px' }} className="text-sm flex gap-5">
                        <BiBuilding  /> Department: {jobPost.department}
                      </p>
                
                  
                    </div>

                    <div className={`${isLargerThan1080?"mb-2 flex flex-col justify-center py-1":"mb-2 flex flex-col justify-center py-1 ml-20 mt-3"}`}>
                    <p style={{ marginTop: '5px' }} className="text-sm flex gap-5">
                      <FaPersonChalkboard /> Experience Level: {jobPost.experienceLevel}
                      </p>
                      <p style={{ marginTop: '5px' }} className="text-sm flex gap-5">
                        <BiLineChart  /> Experience Range: {jobPost.values[0]} to {jobPost.values[1]}
                      </p>
                      <p style={{ marginTop: '5px' }} className="text-sm flex gap-5">
                        <BsClock  /> Submission Deadline: {formatCreatedAt(jobPost.submissionDeadline)}
                      </p>
                    </div>

                    <div className="mb-2 flex flex-col justify-between items-center">
                      {/* You can add more fields here */}
                      <br />
                      <button
                        onClick={() => handleApp(jobPost._id)}
                        className={`${isLargerThan1080?" mb-10 rounded-lg bg-black text-white px-8 py-4 text-center no-underline inline-block text-base my-2 mx-2 cursor-pointer":" mb-10 rounded-lg bg-black text-white px-8 py-2 text-center no-underline inline-block text-base w-2/3 cursor-pointer"}`}
                      
                      >
                        View Jobs
                      </button>{" "}
                    </div>
                  </div>
                </div>
              )): <div className=" flex flex-col  items-center">
              <img
                src="/images/4042.svg" // Adjust the path to your vector image
                alt="No Jobs Available"
                className="w-96 h-96"
              />
           <h1 className="text-center text-4xl font-bold" >No Jobs Available</h1>
            </div>}
         </div>
         ) : (<div className="w-full  flex justify-center">
          <div className="filterloading "></div>
         </div>)
         

         }
    
        </div>
      </div>
      <br></br>
      <br></br>
      <BottomSection />
      <br></br>
    </BaseLayout>
  );
}
