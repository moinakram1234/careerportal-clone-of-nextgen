// components/UpdatePost.js

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { updateJobPost } from '@/server_requests/client_requests';
const UpdatePost = ({ jobPost, onClose }) => {
  const [jobtitle, setJobtitle] = useState(jobPost.jobtitle);
  const [jobtype, setJobtype] = useState(jobPost.jobtype);
  const [joblocation, setJobLocation] = useState(jobPost.joblocation);
  const [description, setDescription] = useState(jobPost.description);
  const [id, setId] = useState(jobPost.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the function from the separate API file to handle the update
      const updatedJobPost = await updateJobPost({
        id,
        jobtitle,
        jobtype,
        joblocation,
        description,
      });

      console.log('Job post updated successfully:', updatedJobPost);
      onClose();
    } catch (error) {
      console.error('Error updating job post:', error);
    }
  };

  const handleQuillChange = (value) => {
    setDescription(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white p-8 rounded-md z-10 w-1/2">
        <h2 className="text-2xl font-bold mb-6">Edit Job Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="jobtitle" className="block text-gray-700 text-sm font-bold mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="jobtitle"
              className="w-full p-2 border rounded-md"
              placeholder="Enter job title"
              value={jobtitle}
              onChange={(e) => setJobtitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobtype" className="block text-gray-700 text-sm font-bold mb-2">
              Job Type
            </label>
            <input
              type="text"
              id="jobtype"
              className="w-full p-2 border rounded-md"
              placeholder="Enter job type"
              value={jobtype}
              onChange={(e) => setJobtype(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="joblocation" className="block text-gray-700 text-sm font-bold mb-2">
              Job Location
            </label>
            <input
              type="text"
              id="joblocation"
              className="w-full p-2 border rounded-md"
              placeholder="Enter job location"
              value={joblocation}
              onChange={(e) => setJobLocation(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Job Description
            </label>
            {/* Replace ReactQuill with a standard text input */}
            <textarea
              id="description"
              className="w-full h-40 p-2 border rounded-md justify-items-start"
              placeholder="Enter job description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 mt-6 rounded-md hover:bg-blue-600"
          >
            Update Job Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
