// PostJobs.js

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BaseLayout from "../../admincomponents/BaseLayout";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdatePost from "../../admincomponents/updatepost";
import Modal from "@/admincomponents/modal";
import "react-quill/dist/quill.bubble.css";
import { fetchJobPosts } from "@/server_requests/client_requests";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PostJobs = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [selectedJobPost, setSelectedJobPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
//fetch data job post data.....
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchJobPosts();
      setJobPosts(data);
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
    try {
      const response = await fetch(`/api/postjob?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setJobPosts((prevJobPosts) =>
          prevJobPosts.filter((jobPost) => jobPost.id !== id)
        );
        toast("Job post deleted successfully");
      } else {
        console.error("Error deleting job post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting job post:", error);
    }
  };

  return (
    <BaseLayout>
      <div className="h-5/6 mt-8 mx-auto w-4/5 p-6 bg-white rounded-md shadow-md overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Job Posts</h2>

        {/* Display job posts */}
        {jobPosts.map((jobPost) => (
          <div
            key={jobPost.id}
            className="border p-4 my-4 flex flex-col items-end md:flex-row md:justify-between"
          >
            <div>
              <h3 className="text-xl font-bold">{jobPost.jobtitle}</h3>
              <ReactQuill
                    readOnly={true}
                    theme={"bubble"}                 
                  value={jobPost.description || ""}
                />
            </div>
            <div className="flex  text-center mt-4 md:mt-0">
              <div className="mr-4 rounded-2xl text-gray-800 w-28 h-9 pt-2" style={{ backgroundColor: "#F8FAFC" }}>
                {jobPost.jobtype}
              </div>
              <div className="mr-4 rounded-2xl text-gray-800 bg-gray-300 w-28 h-9 pt-2" style={{ backgroundColor: "#F8FAFC" }}>
                {jobPost.joblocation}
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(jobPost)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(jobPost.id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}

        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <UpdatePost jobPost={selectedJobPost} onClose={handleCloseModal} />
          </Modal>
        )}
      </div>

      <ToastContainer />
    </BaseLayout>
  );
};

export default PostJobs;
