// PostJobs.js

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BaseLayout from "@/admincomponents/BaseLayout";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdatePost from "@/admincomponents/updatepost";
import Modal from "@/admincomponents/modal";
import "react-quill/dist/quill.bubble.css";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableCaption,
} from "@chakra-ui/table";
import {
  Box,
  Button,
  Input,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import {
  deleteArchiveJobPost,
  fetchJobPosts,
  updateRestore,
} from "@/server_requests/client_requests";
import Loader from "@/components/loader";
import { useRouter } from "next/router";
import { isTokenExpired } from "../../tokenUtils";
import parseJwt from "../parsetoken";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PostJobs = () => {
  const [jobPosts, setJobPosts] = useState(null);
  const [selectedJobPost, setSelectedJobPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const [enableStates, setEnableStates] = useState({});
  const [isValidToken, setIsValidToken] = useState(false);
  const [isspinner, setIsspinner] = useState(false);
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const headers = [
    "Job Title",
    "Job Type",
    "Job Location",
    "Description",
    "Created At",
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
        (jobPost) => jobPost.status === "deleted"
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
  //delete job post
  const handleDelete = async (_id) => {
    try {setIsspinner(true);
      const deleted = await deleteArchiveJobPost(_id);
      
      if (deleted) {
        setIsspinner(false)
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
  const handleRestore = async (_id) => {
    try {
     
      setIsspinner(true);
      await updateRestore(_id);
      setIsspinner(false);
      const data = await fetchJobPosts();
      const filteredJobPosts = data.filter(
        (jobPost) => jobPost.status === "deleted"
      );
      setJobPosts(filteredJobPosts);
    } catch (error) {
      console.error("Error updating enable status:", error);
      // Handle error appropriately
    }
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

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "white",
        },
      },
    },
  });
  return (
    <div>
    {isValidToken == true ? (
      <BaseLayout>
        <div className="mt-5">
          <ChakraProvider theme={theme}>
            <Box p={8} >
              <div className="w-full sm:w-1/2 md:w-2/4 lg:w-2/5 xl:w-1/3">
                <Input
                  placeholder="Search Job Title..."
                  mb={4}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <TableContainer>
                <Table variant="simple" >
                  <Thead
                    className="bg-[#FFC83D]  border"
                    style={{ borderRadius: "20px" }}
                  >
                    <Tr>
                      {headers.map((header, index) => (
                        <Th key={index} >{header}</Th>
                      ))}
                      <Th>Actions</Th>
                     
                    </Tr>
                  </Thead>
                  <Tbody>
                    {jobPosts != null ? (
                      jobPosts
                        .filter(
                          (jobPost) =>
                            jobPost.jobTitle.toLowerCase().includes(
                              searchInput.toLowerCase()
                            ) )
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
                              {/* Add your action buttons here */}

                              <div className="flex gap-4">
                            
                                <Button
                                  onClick={() => handleDelete(jobPost._id)}
                                  colorScheme="red"
                                  size="sm"
                                >
                                  Delete
                                </Button>
                                <Button
                                  onClick={() => handleRestore(jobPost._id)}
                                  size="sm"  
                                >
                                  Restore

                    
                                </Button>
                              </div>
                            </Td>
                          </Tr>
                        ))
                    ) : (
                      <Loader />
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </ChakraProvider>
       
        </div>
      </BaseLayout>
    ) : (
      <p>session expired</p>
    )}
  </div>
  );
};

export default PostJobs;
