import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  PersonNaneicon,
  Contacticon,
  HomeAddress,
  Degreeicon,
  Pdficon,
  Departmenticon,
  Coverlettericon,
  Emailicon,
} from "@/assets/CustomIcons";
import { FaTrash } from "react-icons/fa";
import {
  deleteData_application,
  fetchData_application,
} from "@/server_requests/client_requests";
import Loader from "@/components/loader";

const RecievedApplications = () => {
  const [applications, setApplications] = useState(null);

  const filterDataByDate = (data, targetDate) => {
    return data.filter((item) => {
      const createdAt = new Date(item.createdAt).toDateString(); // Use the correct property name 'createAt'
      return createdAt === targetDate;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const L_APP_data = await fetchData_application();
        const filteredJobApplications = L_APP_data.filter(jobApplication => jobApplication.status !== "deleted");
        const data=filteredJobApplications;
        const today = new Date().toDateString();
        const today_Application_Data = filterDataByDate(data, today);
        setApplications(today_Application_Data);
        setApplications(data);
      } catch (error) {
        // Handle the error appropriately
        console.error("Error loading data:", error);
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
    <div className="relative col-span-1 m-auto h-[50vh] w-full overflow-scroll rounded-lg border shadow bg-white p-4 lg:h-[70vh]">
      <h1>Recent Applications</h1>
      <ul>
        {applications != null ? (
          applications.map((data, index) => (
            <li
              key={index}
              className="rouded-lg  flex cursor-pointer items-center bg-slate-50 p-2 hover:bg-slate-100"
            >
              <div className="rounded-lg bg-rose-50 p-2">
                <Link href={`${data.cv}`} passHref>
                  {" "}
                  <Pdficon className="text-rose-500" />
                </Link>
              </div>

              <div className="pl-4">
                <p className="font-bold text-slate-700">{data.fullName}</p>
                <p className="text-sm text-slate-400">
                  {data.jobpostApp[0]?(<div>{data.jobpostApp[0].jobtitle}</div>):"Post Deleted....."}
                </p>
              </div>
              <p className="absolute right-6 text-sm md:hidden lg:flex">
                {data.phone}
              </p>
            </li>
            // <div
            //   key={index}
            //   className="bg-gray-200 ml-4 p-4 rounded shadow-md w-2/5"
            // >
            //   <div className="flex mb-4">
            //     <h3 className="font-bold">Application For:</h3>
            //     <h3 className="ml-3">{data.jobpostApp[0].jobtitle}</h3>
            //   </div>
            //   <div className="flex mb-4">
            //     <h3 className="font-bold">Job Type:</h3>
            //     <h3 className="ml-3">{data.jobpostApp[0].jobtype}</h3>
            //   </div>
            //   <div className="flex mb-4">
            //     <h3 className="font-bold">Job Location:</h3>
            //     <h3 className="ml-3">{data.jobpostApp[0].joblocation}</h3>
            //   </div>
            //   <hr className="w-full block mt-2 h-1 bg-gray-600"></hr>

            //   {/* Other details... */}

            //   <div className="flex items-center mt-2">
            //     <i>
            //       <PersonNaneicon />
            //     </i>
            //     <span className="ml-3">{data.fullName}</span>
            //   </div>

            //   {/* ... (Other details) ... */}

            //   <div className="flex mt-2">
            //     <i>
            //       {" "}
            //       <Contacticon />
            //     </i>
            //     <span className="ml-3">{data.phone}</span>
            //   </div>

            //   {/* ... (Other details) ... */}

            //   <div className="flex mt-2">
            //     <i>
            //       {" "}
            //       <Emailicon />
            //     </i>
            //     <span className="ml-3">{data.email}</span>
            //   </div>

            //   {/* ... (Other details) ... */}

            //   <div className="flex mt-2">
            //     <i>
            //       {" "}
            //       <HomeAddress />
            //     </i>
            //     <span className="ml-3">{data.address}</span>
            //   </div>

            //   {/* ... (Other details) ... */}

            //   <div className="flex mt-2">
            //     <i>
            //       <Degreeicon />
            //     </i>
            //     <span className="ml-3">{data.qualification}</span>
            //   </div>

            //   {/* ... (Other details) ... */}

            //   <div className="flex mt-2">
            //     <i>
            //       <Departmenticon />
            //     </i>
            //     <span className="ml-3">{data.selectedDepartment} </span>
            //   </div>

            //   {/* ... (Other details) ... */}

            //   <div className="flex mt-2">
            //     <i>
            //       <Pdficon />
            //     </i>
            //     <span className="ml-3 cursor-pointer text-blue-500">
            //       <Link href={`${data.cv}`} passHref>
            //         Download CV
            //       </Link>
            //     </span>
            //   </div>
            //   <div className="text-right ">
            //     <button
            //       onClick={() => deleteApplication(data.id, data.cv)}
            //       className="text-red-500 hover:text-red-700"
            //     >
            //       <FaTrash />
            //     </button>
            //   </div>

            // </div>
          ))
        ) : (
          <Loader />
        )}
      </ul>
    </div>
  );
};

export default RecievedApplications;
