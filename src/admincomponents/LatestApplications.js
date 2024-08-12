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
import { BsPerson } from "react-icons/bs";

const RecievedApplications = ({refreshTrigger, onRefreshComplete,RecentAppbg, RecentAppcolor }) => {
  const [applications, setApplications] = useState(null);

  const filterDataByDate = (data, targetDate) => {
    return data.filter((item) => {
      const createdAt = new Date(item.createdAt).toDateString(); // Use the correct property name 'createAt'
      return createdAt === targetDate;
    });
  };
  const fetchData = async () => {
    try {
      let filteredJobApplications;
      const L_APP_data = await fetchData_application();

      if (Array.isArray(L_APP_data.data)) {
        filteredJobApplications = L_APP_data.filter(
          (item) => item.appstatus !== "rejected" && item.appstatus !== "accepted"
        );
        filteredJobApplications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const data = filteredJobApplications;
        const today = new Date().toDateString();
        const today_Application_Data = filterDataByDate(data, today);
        setApplications(today_Application_Data);
        onRefreshComplete();
      }
    } catch (error) {
      // Handle the error appropriately
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);
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
    <div className="relative col-span-1 h-[50vh] w-full overflow-y-auto overflow-x-hidden rounded-lg border shadow p-4 lg:h-[55vh]" style={{backgroundColor: RecentAppbg}}>
      <h1 className="text-lg font-bold font-spartan" style={{ color:RecentAppcolor}}>Recent Applications</h1>
      <ul>
       
        {applications != null ? (
          applications.map((data, index) => (
            <li
              key={index}
              className="rouded-lg  flex cursor-pointer items-center  p-2 "
              style={{backgroundColor:RecentAppbg}}
            >
              <div className="rounded-lg bg-rose-50 p-2">
              <BsPerson/>
              </div>

              <div className="pl-4" >
                <p className="font-bold text-sm font-spartan " style={{color: RecentAppcolor}}>{data.personalInfo.name}</p>
                
                <p className="text-sm font-spartan " style={{color: RecentAppcolor}}>
                  
                {data.education.map((education, index) => (
                  <p key={index}>
                    {education.DegreeName ? <div>{education.DegreeName}</div> : "N/A"}
                  </p>
                ))}
                </p>
                <p className="text-sm font-spartan " style={{color: RecentAppcolor}}>
                  {data.user_email?(<div>{data.user_email}</div>):" Deleted....."}
                </p>
             
              </div>
              <p className="font-bold absolute font-spartan right-6 text-sm md:hidden lg:flex" style={{color: RecentAppcolor}}>
                {data.personalInfo.mobile}
              </p>
              
            
            </li>
                     ))
        ) : 
         null
        }
      </ul>
    </div>
  );
};

export default RecievedApplications;
