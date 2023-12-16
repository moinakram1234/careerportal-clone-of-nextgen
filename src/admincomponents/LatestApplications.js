import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HomeIcon,
  PostAddIcon,
  DocumentAttachIcon,
  PersonNaneicon,
  ViewApp,
  Contacticon,
  HomeAddress,
  Degreeicon,
  Pdficon,
  Departmenticon,
  Coverlettericon,
} from "@/assets/CustomIcons";
import { FaTrash } from "react-icons/fa";
import { deleteData_application } from "@/server_requests/client_requests";
const RecievedApplications = () => {
  const [applications, setApplications] = useState([]);

  const filterDataByDate = (data, targetDate) => {
    return data.filter((item) => {
      const createdAt = new Date(item.createdAt).toDateString(); // Use the correct property name 'createAt'
      return createdAt === targetDate;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_URL); // Replace with your actual API endpoint
        const data = await response.json();
        const today = new Date().toDateString();
        const today_Application_Data = filterDataByDate(data, today);
        setApplications(today_Application_Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // The empty dependency array ensures the effect runs once when the component mounts

  //delete application
  const deleteApplication = async (applicationId, path) => {
    await deleteData_application(applicationId, path);
    // After deletion, refresh the list of applications
    const updatedApplications = applications.filter(
      (app) => app.id !== applicationId
    );
    setApplications(updatedApplications);
  };

  return (
    <div
      className="flex flex-wrap ml-5 overflow-y-auto "
      style={{ maxHeight: "90vh" }}
    >
      {applications &&
        applications.map((data, index) => (
          <div
            style={{ backgroundColor: "#f3f4f6" }}
            key={index}
            className="ml-5 mb-4 h-72 w-2/5  rounded shadow-sm shadow-blue-200 overflow-hidden items-center"
          >
            <div className="text-right m-5">
              <button
                onClick={() => deleteApplication(data.id, data.cv)}
                className="text-red-500  hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>

            <div className="ml-5 pt-5 overflow-hidden flex hover:bg-white">
              <i>
                {" "}
                <PersonNaneicon />
              </i>
              <h2 className="ml-3">{data.fullName}</h2>
            </div>

            <div className="ml-5 pt-2 hover:bg-white flex">
              <i>
                {" "}
                <Contacticon />
              </i>
              <span className="ml-3">{data.phone}</span>
            </div>

            <div className="ml-5 pt-2 hover:bg-white flex">
              <i>
                {" "}
                <HomeAddress />
              </i>
              <span className="ml-3">{data.address}</span>
            </div>

            <div className="ml-5 pt-2 flex hover:bg-white">
              <i>
                <Degreeicon />
              </i>
              <span className="ml-3">{data.qualification}</span>
            </div>

            <div className="ml-5 pt-2 flex hover:bg-white">
              <i>
                <Departmenticon />
              </i>
              <span className="ml-3">{data.selectedDepartment} </span>
            </div>
            <div className="ml-5 pt-2 flex hover:bg-white">
              <i>
                <Pdficon />
              </i>
              <span className="ml-3 cursor-pointer text-blue-500">
                
                  <a href={`${data.cv}`} download="resume.pdf">Download CV</a>
              
              </span>
              
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecievedApplications;
