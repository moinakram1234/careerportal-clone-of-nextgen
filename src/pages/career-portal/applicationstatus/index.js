import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faPause,
  faTimes,
  faCheck,
  faFileAlt,
  faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Appstaus.module.css";
import { Text } from "@chakra-ui/react";

import { useRouter } from "next/router";
import Image from "next/image";
import parseJwt from "@/components/parsetoken";
import { isTokenExpired } from "@/components/tokenUtils";
const JobApplicationStatusPage = () => {
  const [formData, setFormData] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [applicationId, setApplicationID] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const tokenData = parseJwt(token);

      // Check if the token has expired
      if (isTokenExpired(tokenData)) {
        // If the token has expired, redirect to the login page
        router.push("/login"); // Adjust the route as per your application setup
        return; // Exit the useEffect callback to prevent further execution
      }

      // Check if all required fields are present in the tokenData
      if (!tokenData.email || !tokenData.phone || !tokenData.CNIC) {
        // If any of the required fields are missing, redirect to the login page
        router.push("/login"); // Adjust the route as per your application setup
      }
    } else {
      // If no token is found, redirect to the login page
      router.push("/login"); // Adjust the route as per your application setup
    }

    const fetchApplicationStatus = async () => {
      const usertoken = localStorage.getItem("token");
      const tokenData = parseJwt(usertoken);

      const email = tokenData.email; // Example email, replace with actual email variable

      try {
        const response = await fetch(
          `/api/appstatus?email=${encodeURIComponent(email)}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setApplicationStatus(data.formData.appstatus);
        setApplicationID(data.formData._id);
        setFormData(data);
      
        console.log(formData?.personalInfo?.name); // Example log, check console for output
      } catch (error) {
        console.error("Error fetching application status:", error);
      }
    };

    fetchApplicationStatus();
  }, []); // Empty dependency array ensures useEffect runs once on component mount

  const renderStatusText = () => {
    switch (applicationStatus) {
      case "inprogress":
        return <Text>In Progress</Text>
      // case "received":
      //   return <Text>Received</Text>;
      case "rejected":
        return <Text>Rejected</Text>;
      case "accepted":
        return <Text>Accepted</Text>;
      default:
        return <Text>Submimitted</Text>;
    }
  };
  const renderStatusIcon = () => {
    switch (applicationStatus) {
      case "inprogress":
        return faEllipsisH;
      // case "received":
      //   return faFileCircleCheck;
      case "rejected":
        return faTimes;
      case "accepted":
        return faCheck;
      default:
        return faFileAlt;
    }
  };
  return (
    <div className="min-h-screen bg-[#2F2EA6]">
      <div className="w-full bg-white lg:bg-[#2F2EA6] p-4 border border-white">
    
      <div className="">
      <div>
      <Image
        src="/logo.png"
        alt="NextGen Logo"
        width={128} // Specify width
        height={128} // Specify height
        className="lg:w-32 lg:h-32 w-10 h-10 absolute"
      />
      </div>
<div className="relative">

</div>
      <h2 className="lg:text-6xl text-2xl lg:text-white font-semibold mb-4 text-center">
          Application Status
        </h2>
        <div className="text-center text-sm lg:text-white mb-4">
   <strong>Application ID:</strong> {applicationId.toUpperCase()}
        </div>
        <div>
          <div className="flex flex-wrap items-center justify-center">
            <div className="lg:flex hidden bg-gray-200 p-2 ju rounded-md w-full  max-w-3xl items-center flex-wrap">
              <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-[#2F2EA6] flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="text-white w-4 h-4 sm:w-6 sm:h-6"
                    />
                  </div>
              {applicationId? <Text>Submitted</Text>: <Text>Incomplete</Text>}   
                </div>
              </div>
              <div
                className="flex-grow border-2 rounded-md mb-10 border-[#2F2EA6] mx-4 sm:mx-7"
                style={{ marginLeft: 0, marginRight: 0 }}
              ></div>

              <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center">
                  <div
                    className={`h-10 w-10 sm:h-14 sm:w-14 rounded-full ${
                      applicationStatus === "inprogress"
                        ? "bg-blue-500"
                        : "bg-[#2F2EA6]"
                    } flex items-center justify-center`}
                  >
                    {["inprogress", "received", "accepted", "rejected"].includes(
                      applicationStatus
                    ) && (
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        className="text-white  w-4 h-4 sm:w-6 sm:h-6"
                      />
                    )}
                  </div>{" "}
                  {applicationStatus === "inprogress" && renderStatusText()}
                  {applicationStatus === "received" && <Text>In Progress</Text>}
                  {applicationStatus === "accepted" && <Text>In Progress</Text>}
                  {applicationStatus === "rejected" && <Text>In Progress</Text>}
                </div>
              </div>
              <div
                style={{ marginLeft: 0, marginRight: 0 }}
                className={`flex-grow border-2 rounded-md mb-10 ${
                  applicationStatus === "received"
                    ? "border-[#2F2EA6]"
                    : applicationStatus === "accepted" ||
                      applicationStatus === "rejected"
                    ? "border-[#2F2EA6]"
                    : "border-gray-300"
                } mx-4 sm:mx-7`}
              ></div>
              <div className="flex justify-center items-center h-full">
                {/* <div className="flex flex-col items-center">
                  <div
                    className={`h-10 w-10 sm:h-14 sm:w-14 rounded-full ${
                      applicationStatus === "received"
                        ? "bg-blue-500"
                        : applicationStatus === "accepted" ||
                          applicationStatus === "rejected"
                        ? "bg-[#2F2EA6]"
                        : "bg-gray-300"
                    } flex items-center justify-center`}
                  >
                    {["received", "accepted", "rejected"].includes(
                      applicationStatus
                    ) && (
                      <FontAwesomeIcon
                        icon={faFileCircleCheck}
                        className="text-white w-4 h-4 sm:w-6 sm:h-6"
                      />
                    )}
                  </div>{" "}
                  {applicationStatus !== "received" && (applicationStatus === "accepted" || applicationStatus === "rejected" ? <Text>Received</Text> : <Text>...</Text>)}
                  {applicationStatus === "received" && renderStatusText()}
                 
                </div> */}
              </div>
              {/* <div
                style={{ marginLeft: 0, marginRight: 0 }}
                className={`flex-grow border-2 rounded-md mb-10 ${
                  applicationStatus === "accepted" ||
                  applicationStatus === "rejected"
                    ? "border-[#2F2EA6]"
                    : "border-gray-300"
                } mx-4`}
              ></div> */}
              <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center">
                  <div
                    className={`h-10 w-10 sm:h-14 sm:w-14 rounded-full ${
                      applicationStatus === "rejected"
                        ? "bg-red-500"
                        : applicationStatus === "accepted"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    } flex items-center justify-center`}
                  >
                    {["accepted"].includes(applicationStatus) && (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-white w-4  h-4 sm:w-6 sm:h-6"
                      />
                    )}
                    {["rejected"].includes(applicationStatus) && (
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="text-white w-4 h-4 sm:w-6 sm:h-6"
                      />
                    )}
                  </div>
                  {applicationStatus === "accepted" && renderStatusText()}
                  {applicationStatus === "rejected" && renderStatusText()}
                  {(applicationStatus !== "rejected" && applicationStatus !== "accepted")&&<Text>......</Text>}
                </div>{" "}
              </div>
            </div>
            <div className="flex lg:hidden justify-center  items-center h-full">
              <div className="flex flex-col items-center ">
                <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full border  bg-[#39c840] flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={renderStatusIcon()}
                    className="text-white w-4 h-4 sm:w-6 sm:h-6"
                  />
                </div>
                {renderStatusText()}
                <h1></h1>
              </div>
            </div>
          </div>
     
        </div>
      </div>
        









      </div>
      <div className="bg-[#2F2EA6] p-4  md:p-5  mt-2">
        {formData && (
          <div className="flex flex-wrap -mx-4 ">
            <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
              <div className="bg-white shadow-md rounded-md h-full p-4 mb-6">
                <div className={`${styles.cardheader}`}>
                  Personal Information
                </div>
                <div className={`${styles.cardbody}`}>
                  <div className={`${styles.cardrow}`}>
                    <strong>Name:</strong>
                    <div className={`${styles.carddata}`}>
                      {formData.formData.personalInfo.name}
                    </div>
                  </div>
                  <div className={`${styles.cardrow}`}>
                    <strong>Email:</strong>
                    <div className={`${styles.carddata}`}>
                      {formData.formData.personalInfo.email}
                    </div>
                  </div>
                  <div className={`${styles.cardrow}`}>
                    <strong>Mobile:</strong>
                    <div className={`${styles.carddata}`}>
                      {formData.formData.personalInfo.mobile}
                    </div>
                  </div>
                  <div className={`${styles.cardrow}`}>
                    <strong>City:</strong>
                    <div className={`${styles.carddata}`}>
                      {formData.formData.personalInfo.city}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
              <div className="bg-white shadow-md rounded-md h-full p-4 mb-6">
                <div className={`${styles.cardheader}`}>Education</div>

                {formData.formData.education.map((edu, index) => (
                  <div key={index} className={`border  ${styles.cardbody}`}>
                    <div className={`text-sm p-2 mb-1 rounded-tl-lg rounded-tr-lg  bg-blue-500 text-white `}>
                      {edu.DegreeName}
                    </div>
                    <React.Fragment key={index}>
                      <div className={`${styles.cardrow}`}>
                        <strong>Degree Name:</strong>
                        <div className={`${styles.carddata}`}>
                          {edu.DegreeName}
                        </div>
                      </div>
                      <div className={`${styles.cardrow}`}>
                        <strong>Institute Name:</strong>
                        <div className={`${styles.carddata}`}>
                          {edu.InstituteName}
                        </div>
                      </div>
                      <div className={`${styles.cardrow}`}>
                        <strong>Graduation Year:</strong>
                        <div className={`${styles.carddata}`}>
                          {edu.Graduation_year}
                        </div>
                      </div>
                      
                    </React.Fragment>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
              <div className="bg-white shadow-md rounded-md h-full p-4 mb-6">
                <div className={`${styles.cardheader}`}>
                  {" "}
                  Preferred Function
                </div>
                <div className={`${styles.cardbody}`}>
                  <div className={`${styles.cardrow}`}>
                    <strong>Preferred Function:</strong>
                    <div className={`${styles.carddata}`}>
                      {formData.formData.internshipPreference.preferredFunction}
                    </div>
                  </div>
                  <div className={`${styles.cardrow}`}>
                    <strong>Location:</strong>
                    <div className={`${styles.carddata}`}>
                      {formData.formData.internshipPreference.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
              <div className="bg-white shadow-md rounded-md h-full p-4 mb-6">
                <div className={`${styles.cardheader}`}>Work Experience</div>
                {formData.formData.workExperience.map((experience, index) => (
                  <div key={index} className="mb-2">
                    <div className={`${styles.cardbody}`}>
                      <div className={`${styles.cardrow}`}>
                        <strong>Position Held:</strong>
                        <div className={`${styles.carddata}`}>
                          {experience.PositionHeld}
                        </div>
                      </div>
                      <div className={`${styles.cardrow}`}>
                        <strong>Organization Name:</strong>
                        <div className={`${styles.carddata}`}>
                          {experience.OrganizationName}
                        </div>
                      </div>
                      <div className={`${styles.cardrow}`}>
                        <strong>From Date:</strong>
                        <div className={`${styles.carddata}`}>
                          {experience.FromDate
                            ? new Date(experience.FromDate).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>
                      <div className={`${styles.cardrow}`}>
                        <strong>To Date:</strong>
                        <div className={`${styles.carddata}`}>
                          {experience.ToDate
                            ? new Date(experience.ToDate).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationStatusPage;
