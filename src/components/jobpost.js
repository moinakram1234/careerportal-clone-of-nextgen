import React from 'react';
import { PiBagSimpleFill } from 'react-icons/pi';
import { FaLocationCrosshairs } from 'react-icons/fa';
import { WiTime5 } from 'react-icons/wi';
import dynamic from "next/dynamic";
// Replace this import
// import ReactQuill from 'react-quill';// With a dynamic import
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



const JobCard = ({ jobPost, index, expandedDescriptions, handleReadMore, handleApplyNow, darkMode }) => {
  const formatCreatedAt = (createdAt) => {
    // Implement your date formatting logic here
    return createdAt;
  };

  return (
    <div
      key={index}
      className={`${
        darkMode ? 'text-white rounded-t-lg' : 'bg-white rounded-t-lg'
      } shadow-lg overflow-hidden mb-6`}
    >
      <div className="bg-blue-900 rounded-t-lg">
        <h3 className="text-lg lg:text-xl rounded-t-lg text-white p-2 lg:p-5 font-bold">
          {jobPost.jobtitle}
        </h3>
      </div>
      <div className="border pb-10 pt-5 pl-2 pr-2 mb-4 relative">
        <div>
          <div>
            <ReactQuill
              className="text-gray-500 bg-white rounded"
              readOnly={true}
              theme="bubble"
              value={
                expandedDescriptions[index]
                  ? jobPost.description || ''
                  : jobPost.description
                  ? `${jobPost.description.substring(0, 300)}...`
                  : ''
              }
            />
            <div className="text-end pr-4">
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
            <div className="flex flex-col md:flex-row m-10">
              <div className="mb-3 md:mb-0 mr-4 flex gap-2 text-gray-500 bg-[#F8FAFC] border text-center rounded-2xl w-full md:w-36 h-9 pl-4 pt-2 pr-5 pb-3 bg-[#F8FAFC]">
                <PiBagSimpleFill size={20} />
                {jobPost.jobtype}
              </div>
              <div className="mb-3 md:mb-0 mr-4 flex gap-3 justify-center border w-full lg:w-4/5 bg-[#F8FAFC] rounded-2xl text-gray-500 pl-4 pt-2 pr-5 pb-3 bg-[#F8FAFC]">
                <FaLocationCrosshairs size={20} />
                {jobPost.joblocation}
              </div>
              <div className="text-xs rounded-2xl flex gap-3 bg-[#F8FAFC] border text-gray-600 h-9 pl-4 pt-2 pr-5 pb-3 bg-[#F8FAFC]">
                <WiTime5 size={20} />
                {formatCreatedAt(jobPost.createdAt)}
              </div>
            </div>
          </div>
        </div>
        {/* Apply Now button */}
        <button
          style={{ backgroundColor: '#005794' }}
          className="text-white py-1 lg:py-2 text-sm w-20 rounded absolute bottom-2 right-2 hover:bg-blue-600"
          onClick={() => handleApplyNow(index)}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
