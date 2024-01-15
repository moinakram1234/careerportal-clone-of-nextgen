// PostJobs.js

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BaseLayout from "@/admincomponents/BaseLayout";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdatePost from "@/admincomponents/updatepost";
import Modal from "@/admincomponents/modal";
import "react-quill/dist/quill.bubble.css";
import {
  deleteArchiveJobPost,
  fetchJobPosts,
  updateRestore,
} from "@/server_requests/client_requests";
import Loader from "@/components/loader";
import { useRouter } from "next/router";
import { isTokenExpired } from "../../tokenUtils";
import parseJwt from "../parsetoken";
import SpinnerIcon from "@/components/SpinnerIcon";
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
        initialEnableStates[jobPost.id] = jobPost.enable;
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
  const handleDelete = async (id) => {
    try {setIsspinner(true);
      const deleted = await deleteArchiveJobPost(id);
      
      if (deleted) {
        setIsspinner(false)
        setJobPosts((prevJobPosts) =>
          prevJobPosts.filter((jobPost) => jobPost.id !== id)
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
  const handleRestore = async (id) => {
    try {
      setIsspinner(true);
      await updateRestore(id);
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

  const handleReadMore = (index) => {
    // Toggle the expanded state for the clicked job post
    const updatedExpandedDescriptions = [...expandedDescriptions];
    updatedExpandedDescriptions[index] = !updatedExpandedDescriptions[index];
    setExpandedDescriptions(updatedExpandedDescriptions);
  };
  return (
    <div>
      {" "}
      {isValidToken == true ? (
        <BaseLayout>
          <div className="h-5/6 mt-8 mx-auto w-full p-6 bg-white rounded-md shadow-md overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 font-sans text-gray-500   text-center">
              Job Posts
            </h2>
            <div className="flex justify-center">
              {isspinner && <SpinnerIcon />}
            </div>
            {/* Display job posts */}
            {jobPosts != null ? (
              jobPosts.map((jobPost, index) => (
                <div key={index}>
                  <div
                    style={{ backgroundColor: "#005997" }}
                    className="flex justify-between rounded-t-lg"
                  >
                    <h3 className="text-xl text-white p-2 font-bold">
                      {jobPost.jobtitle}
                    </h3>
                    {/* Enable Toggle Button */}
                    <div className="flex items-center space-x-2">
                      <label
                        htmlFor={`enableSwitch-${jobPost.id}`}
                        className="cursor-pointer pr-6"
                      >
                        <button
                          className="hover:text-green-400 font-sans text-white"
                          onClick={() => handleRestore(jobPost.id)}
                        >
                          Restore
                        </button>
                      </label>
                    </div>
                  </div>
                  <div className="border pr-8   flex flex-col items-end md:flex-row md:justify-between">
                    <div>
                      <ReactQuill
                        readOnly={true}
                        theme={"bubble"}
                        value={
                          expandedDescriptions[index]
                            ? jobPost.description || ""
                            : jobPost.description
                            ? `${jobPost.description.substring(0, 300)}...`
                            : ""
                        }
                      />
                      {!expandedDescriptions[index] && (
                        <button
                          className="text-blue-500 hover:underline ml-5 text-sm"
                          onClick={() => handleReadMore(index)}
                        >
                          Read More
                        </button>
                      )}
                      {expandedDescriptions[index] && (
                        <button
                          className="text-blue-500 hover:underline ml-5 text-sm"
                          onClick={() => handleReadMore(index)}
                        >
                          Read Less
                        </button>
                      )}
                    </div>
                    <div className="flex  text-center mt-4 md:mt-0">
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
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(jobPost)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(jobPost.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )}

            {isModalOpen && (
              <Modal onClose={handleCloseModal}>
                <UpdatePost
                  jobPost={selectedJobPost}
                  onClose={handleCloseModal}
                />
              </Modal>
            )}
          </div>
        </BaseLayout>
      ) : (
        <p>session expired</p>
      )}
    </div>
  );
};

export default PostJobs;
