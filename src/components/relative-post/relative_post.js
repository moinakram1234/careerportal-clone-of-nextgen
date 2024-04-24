import {  Flex} from "@chakra-ui/react";
import {
  fetchJobPostDetails,
  fetchJobPosts,
} from "@/components/export_libraries/exportlibrary";
import { useEffect, useState } from "react";


const JobPostTile = ({
  title,
  deadline,
  location,
  setJobDetails,
  postId,
  sale,
  onReadMoreClick,
}) => {
  const handleJobDetails = async () => {
    const details = await fetchJobPostDetails(postId);
    
    onReadMoreClick();
    setJobDetails(details);
    slowScrollToTop();
  };

  const slowScrollToTop = () => {
    const scrollStep = -window.scrollY / (500 / 15); // Adjust the duration here (500)
    const scrollInterval = setInterval(function () {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
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
  return (
    <div className="border p-4 m-2 w-full text-left hover:scale-110 transition-all duration-700 rounded-2xl">
      <h1 className="font-bold text-lg">{title}</h1>
      <div className="grid grid-cols-3 gap-4">
        <h2 className="mt-2 text-xs">
          Deadline:{" "}
          <span className="text-gray-500">{formatCreatedAt(deadline)}</span>
        </h2>
        <h2 className="mt-2 text-xs">
          Location:<span className="text-gray-500"> {location}</span>
        </h2>
        <h2 className="mt-2  text-xs">
          Department: <span className="text-gray-500">{sale}</span>
        </h2>
      </div>
      <div className="text-right">
        <button
          className="bg-black text-xs p-2 hover:bg-black text-white rounded-lg mt-4 transition-all duration-500"
          onClick={handleJobDetails}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

const Relative_Post = ({ setJobDetails, jobDetails, onReadMoreClick }) => {
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const data = await fetchJobPosts();
        const filteredData = data.filter((jobPost) => {
          return (
            jobDetails.department == jobPost.department &&
            jobDetails._id !== jobPost._id &&
            jobPost.enable === true
          );
        });
       

        setJobPosts(filteredData);
      } catch (error) {
        console.error("Error fetching job posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Flex flexWrap="wrap">
      <h1 className="text-3xl rounded-t-lg font-semibold text-left   w-full bg-[#E8F0FE]  p-3">
        Related Jobs
      </h1>
      {jobPosts.length > 0 ? (
        jobPosts.map((jobPost) => (
          <JobPostTile
            key={jobPost._id} // Assuming each job post has a unique id
            title={jobPost.jobTitle}
            deadline={jobPost.submissionDeadline}
            location={jobPost.jobLocation}
            sale={jobPost.department}
            setJobDetails={setJobDetails}
            postId={jobPost._id}
            onReadMoreClick={onReadMoreClick}
          />
        ))
      ) : (
        <div className="flex flex-col ">
          <img
            src="/images/404.svg"
            alt="No jobs found"
            className="w-64 h-64"
          />
          <p className="text-xl mt-4">No relative jobs found</p>
        </div>
      )}
    </Flex>
  );
};

export default Relative_Post;
