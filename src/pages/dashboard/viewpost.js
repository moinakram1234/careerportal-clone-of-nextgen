// PostJobs.js

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BaseLayout from "../../admincomponents/BaseLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdatePost from "../../admincomponents/updatepost";
import Modal from "@/admincomponents/modal";
import "react-quill/dist/quill.bubble.css";
import {
  deleteJobPost,
  fetchJobPosts,
  notify_to_users,
  updateEnableStatus,
} from "@/server_requests/client_requests";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import {
  Box,
  Input,
  ChakraProvider,
  extendTheme,
  Menu,
  IconButton,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { isTokenExpired } from "@/components/tokenUtils";
import parseJwt from "@/components/parsetoken";
import { DeleteIcon,  EditIcon, EmailIcon } from "@chakra-ui/icons";
import { RxDropdownMenu } from "react-icons/rx";


const PostJobs = () => {
  const [jobPosts, setJobPosts] = useState(null);
  const [selectedJobPost, setSelectedJobPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const [enableStates, setEnableStates] = useState({});
  const [isValidToken, setIsValidToken] = useState(false);
  const router = useRouter();
  const ReactQuill =
  typeof window !== "undefined" ? require("react-quill") : () => false;
  const [searchInput, setSearchInput] = useState("");
  const headers = [
    "Job Title",
    "Job Type",
    "Job Location",
    "Description",
    "Created At",
    "Enable/Disable",
  ];
  const redirectToHome = () => router.push("/");

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
    }
  };

  //fetch data job post data.....
  useEffect(() => {
    checkTokenExpiration();
    const fetchData = async () => {
      const data = await fetchJobPosts();
      const filteredJobPosts = data.filter(
        (jobPost) => jobPost.status !== "deleted"
      );
      setJobPosts(filteredJobPosts);
      setExpandedDescriptions(Array(data.length).fill(false));
      const initialEnableStates = {};
      data.forEach((jobPost) => {
        initialEnableStates[jobPost._id] = jobPost.enable;
      });
      setEnableStates(initialEnableStates);
    };

    fetchData();
  }, []);
  // hadle edit job post
  const handleEdit = (jobPost) => {
    setSelectedJobPost(jobPost);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handle_to_notify = async (_id) => {
    try {
      // Get the list of candidates for the job post
      const Notify= await notify_to_users(_id);

      // Show a success message
      toast("Notifications sent to all candidates");
    } catch (error) {
      console.error("Error sending notifications:", error);
      // Handle error appropriately
    }
  };


  //delete job post
  const handleDelete = async (_id) => {
    try {
      // setIsdeleting(true);
      const deleted = await deleteJobPost(_id);

      if (deleted) {
        // setIsdeleting(false);
        setJobPosts((prevJobPosts) =>
          prevJobPosts.filter((jobPost) => jobPost._id !== _id)
        );
        toast("Job post deleted successfully");
      }
      // Handle case where deletion fails (optional)
    } catch (error) {
      console.error("Error handling deletion:", error);
      // Handle error appropriately
    }
  };

  // Function to handle toggling the `enable` state
  const handleToggleEnable = async (_id) => {
    try {
      const updatedEnableState = !enableStates[_id];
      setEnableStates((prevStates) => ({
        ...prevStates,
        [_id]: updatedEnableState,
      }));
     
      const status = await updateEnableStatus(_id, updatedEnableState);
      toast(status);
    } catch (error) {
      console.error("Error updating enable status:", error);
      // Handle error appropriately
    }
  };

  const handleReadMore = (index) => {
    // Toggle the expanded state for the clicked job post
    const updatedExpandedDescriptions = [...expandedDescriptions];
    updatedExpandedDescriptions[index] = !updatedExpandedDescriptions[index];
    setExpandedDescriptions(updatedExpandedDescriptions);
  };
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "white",
        },
      },
    },
  });
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };

  return (
    <div>
      {isValidToken == true ? (
        <div>
          <BaseLayout>
            <div className="mt-5">
              <ChakraProvider theme={theme}>
                <Box p={8}>
                  <div className="w-full sm:w-1/2 md:w-2/4 lg:w-2/5 xl:w-1/3">
                    <Input
                      placeholder="Search..."
                      mb={4}
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </div>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead
                        className="bg-[#FFC83D]  border"
                        style={{ borderRadius: "20px" }}
                      >
                        <Tr>
                          {headers.map((header, index) => (
                          <Th key={index}>{header}</Th>
                          ))}
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {jobPosts != null ? (
                          jobPosts
                            .filter(
                              (jobPost) =>
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
                            .map((jobPost, index) => (
                              <Tr key={index} className="border">
                                <Td>{jobPost.jobTitle}</Td>
                                <Td>{jobPost.jobType}</Td>
                                <Td>{jobPost.jobLocation}</Td>
                                <Td>
                                  {" "}
                                  <div className="flex ">
                                    <ReactQuill
                                      className=""
                                      readOnly={true}
                                      theme={"bubble"}
                                      value={
                                        expandedDescriptions[index]
                                          ? jobPost.description || ""
                                          : jobPost.description
                                          ? `${jobPost.description.substring(
                                              0,
                                              30
                                            )}....`
                                          : ""
                                      }
                                    />
                                  </div>
                                </Td>

                                <Td> {formatCreatedAt(jobPost.createdAt)}</Td>
                                <Td>
                                  
                                    <button
                                      onClick={() =>
                                        handleToggleEnable(jobPost._id)
                                      }
                                    >
                                      <div
                                        className={`w-10 h-5 rounded-full   ${
                                          enableStates[jobPost._id]
                                            ? "bg-[#FFC83D]"
                                            : "bg-[red] blur-5 "
                                        }`}
                                      >
                                        <div
                                          className={`bg-white w-5 h-5 rounded-full shadow-md transform ${
                                            enableStates[jobPost._id]
                                              ? "translate-x-6"
                                              : ""
                                          } transition`}
                                        ></div>
                                      </div>
                                    </button>
                            
                                </Td>

                                <Td>
                                  {/* Add your action buttons here */}
                                  <Menu>
                                    <IconButton
                                      as={MenuButton}
                                      aria-label="Options"
                                      icon={<RxDropdownMenu size={25} />}
                                      variant="unstyled"
                                      _focus={{ outline: "none" }}
                                    />
                                    <MenuList>
                                      <MenuItem onClick={() => handle_to_notify(jobPost._id)}>
                                        <Icon
                                          as={EmailIcon} // Change this to the actual icon you want to use
                                          w={5}
                                          h={5}
                                          mr={2}
                                        />
                                        Notify to all Candidates
                                      </MenuItem>
                                      <MenuItem onClick={() => handleEdit(jobPost)}>
                                        <Icon
                                          as={EditIcon} // Change this to the actual icon you want to use
                                          w={5}
                                          h={5}
                                          mr={2}
                                        />
                                        Edit
                                      </MenuItem>
                                      <MenuItem onClick={() => handleDelete(jobPost._id)}>
                                        <Icon
                                          color="red"
                                          as={DeleteIcon} // Change this to the actual icon you want to use
                                          w={5}
                                          h={5}
                                          mr={2}
                                        />
                                        Delete
                                      </MenuItem>
                                    </MenuList>
                                  </Menu>
                                </Td>
                              </Tr>
                            ))
                        ) : (
                          <div className="w-[80%] absolute h-[80vh]  flex justify-center items-center">
        <div className="filterloading "></div>
       </div>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </ChakraProvider>
              {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                  <UpdatePost
                    jobPost={selectedJobPost}
                    onClose={handleCloseModal}
                  />
                </Modal>
              )}{" "}
            </div>
          </BaseLayout>
        </div>
      ) : (
        <p>session expired</p>
      )}
      <ToastContainer />
    </div>
    
  );
};

export default PostJobs;
