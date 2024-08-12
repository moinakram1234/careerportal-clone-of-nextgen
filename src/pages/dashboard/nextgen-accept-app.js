// pages/index.js

import BaseLayout from "@/admincomponents/BaseLayout";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import styles from "./nextgen.module.css";
import { MdPerson, MdSchool, MdWork } from "react-icons/md";
import { LuLassoSelect } from "react-icons/lu";

import * as XLSX from "xlsx";
import {
  Request_To_Reject_application,
  Request_To_Reject_nextgen_application,
} from "@/server_requests/client_requests";
import { toast } from "react-toastify";
import { DownloadIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import parseJwt from "@/components/parsetoken";
import { isTokenExpired } from "@/components/tokenUtils";
export default function Home() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchId, setSearchId] = useState("");
  const router = useRouter();
  const redirectToHome = () => router.push("/login");
  useEffect(() => {
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
    }
  
    fetch(`/api/nextgen?page=download`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) => item.appstatus === "accepted"
        );
        setData(filteredData);
        setFilteredData(filteredData);
      });
  }, []);

  const RejectApplication = async (applicationId, email) => {
    await Request_To_Reject_nextgen_application(applicationId, email);
    toast.success("Application rejected successfully");
    // After deletion, refresh the list of applications
    const updatedApplications = data.filter((app) => app._id !== applicationId);

    setData(updatedApplications);
  };

  const downloadExcel = () => {
    const combinedData = data.flatMap(user => {
      const personalInfo = {
        _id: user._id,
        Name: user.personalInfo.name,
        Gender: user.personalInfo.gender,
        DOB: new Date(user.personalInfo.dob).toLocaleDateString(),
        Email: user.personalInfo.email,
        Mobile: user.personalInfo.mobile,
        CNIC: user.personalInfo.cnic,
        City: user.personalInfo.city,
        PermanentAddress: user.personalInfo.permanentaddress,
        CurrentAddress: user.personalInfo.currentaddress,
        LinkedInHandle: user.personalInfo.linkedinhandle,
        Languages: user.personalInfo.languages.join(", "),
      };

      const education = user.education.map(edu => ({
        DegreeName: edu.DegreeName,
        InstituteName: edu.InstituteName,
        DegreeSpecialization: edu.DegreeSpecialization.join(", "),
        GraduationYear: edu.Graduation_year,
        CGPA: edu.CGPA,
      }));

      const internshipPreference = {
        PreferredFunction: Array.isArray(user.internshipPreference?.preferredFunction) 
          ? user.internshipPreference.preferredFunction.join(", ") 
          : "Not specified",
        Location: user.internshipPreference?.location || "Location not specified",
      };
      const Useremail = {
        Login_Email: user.user_email
     
    };
      const workExperience = user.workExperience.map(work => ({
        PositionHeld: work.PositionHeld,
        OrganizationName: work.OrganizationName,
        FromDate: new Date(work.FromDate).toLocaleDateString(),
        ToDate: new Date(work.ToDate).toLocaleDateString(),
        PresentlyWorking: work.PresentlyWorking ? "Yes" : "No",
      }));

      return education.map(edu => ({
        ...personalInfo,
        ...Useremail,
        ...edu,
        ...internshipPreference,
        ...workExperience,
      }));
    });

    const workbook = XLSX.utils.book_new();
    const combinedSheet = XLSX.utils.json_to_sheet(combinedData);
    XLSX.utils.book_append_sheet(workbook, combinedSheet, "Combined Data");
    XLSX.writeFile(workbook, "acceptedApplications.xlsx");
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase(); // Convert input value to lower case

    setSearchId(value);
    const filtered = data.filter((user) => user._id.toLowerCase().includes(value));
    setFilteredData(filtered);
  };
  return (
    <BaseLayout>
      <div className="container mx-auto p-4 ">
        <div className="flex justify-center p-10 ">
        <h1
              className={`${styles.headertext} text-2xl font-bold  text-[#ffcc00] mb-10`}
            >
              NextGen Leaders Program
            </h1>
        </div>

        {!selectedUser ? (
          <div>
            {" "}
            <div className="flex justify-between mb-5">
              <input
                type="text"
                placeholder="Search by ID"
                value={searchId}
                onChange={handleSearch}
                className="py-0 px-2 border border-gray-300 w-72 rounded"
              />
              <button
                className="p-1 bg-[#ffcc00] text-sm text-white rounded"
                onClick={downloadExcel}
              >
                <DownloadIcon /> Download Excel
              </button>
      
            </div>
            {filteredData?.map((user) => (
              <div
                key={user._id}
                className="bg-white border-b-2 rounded p-4 mb-4 cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center  gap-4">
                  <FaUser className="text-[#ffcc00] " size={18} />
                  <div className="grid grid-cols-4 text-sm ">
                    <p className=" w-[220px]">
                      <strong>Name:</strong> {user.personalInfo.name}
                    </p>
                    <p>
                      <strong>CNIC:</strong> {user.personalInfo.cnic}
                    </p>
                    <p>
                      <strong>Phone:</strong> {user.personalInfo.mobile}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.personalInfo.email}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
          <button
             className="mb-4 pl-10 pr-10 p-1 font-spartan text-sm bg-[#ffcc00] text-white rounded"
             onClick={() => setSelectedUser(null)}
           >
             Back
           </button>
           <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
         
         <div className={`${styles.educationcard}`}>
          <div className={`${styles.cardheader} justify-between`}>
            <div className="flex gap-3">
              <MdPerson style={{ color: "white",  marginRight: "8px" }} />
              <span className="text-lg font-spartan">    Personal Information</span>
            </div>
            <div className=""></div>
          </div>
          <div className={`${styles.cardbody}`}>
            <div className={`${styles.cardrow}`}>
              <strong className="text-sm font-spartan ">Unique ID:</strong>
              <div className="font-spartan text-sml" >{selectedUser._id}</div>
            </div>
            <div className={`${styles.cardrow}`}>
              <strong className="text-sm font-spartan ">Name:</strong>
              <div className="font-spartan text-sml" >{selectedUser.personalInfo.name}</div>
            </div>

            <div className={`${styles.cardrow}`}>
              <strong className="text-sm font-spartan ">Gender:</strong>
              <div className="font-spartan text-sml" > {selectedUser.personalInfo.gender}</div>
            </div>
            <div className={`${styles.cardrow}`}>
              <strong className="text-sm font-spartan">DOB:</strong>
              <div>
                {new Date(
                  selectedUser.personalInfo.dob
                ).toLocaleDateString()}
              </div>
            </div>
            <div className={`${styles.cardrow}`}>
              <strong className="text-sm font-spartan">Email:</strong>
              <div className="font-spartan text-sml" >{selectedUser.personalInfo.email}</div>
            </div>
            <div className={`${styles.cardrow}`}>
              <strong className="text-sm font-spartan">Mobile:</strong>
              <div className="font-spartan text-sml" >{selectedUser.personalInfo.mobile}</div>
            </div>
            <div className={`${styles.cardrow}`}>
              <strong className="text-sm font-spartan">CNIC:</strong>
              <div className="font-spartan text-sml" >{selectedUser.personalInfo.cnic}</div>
            </div>
            <div className={`${styles.cardrow}`}>
              <strong className="text-sm font-spartan">City:</strong>
              <div className="font-spartan text-sml" >{selectedUser.personalInfo.city}</div>
            </div>

            <div className={`${styles.cardrow}`}>
              <strong className="text-sm font-spartan">Permanent Address:</strong>
              <div className="font-spartan text-sml" >{selectedUser.personalInfo.permanentaddress}</div>
            </div>
            <div className={`${styles.cardrow}`}>
              <strong className="text-sm font-spartan">LinkedIn Handle:</strong>
              <div className="font-spartan text-sml" >{selectedUser.personalInfo.linkedinhandle}</div>
            </div>

            <div className={`${styles.cardrow}`}>
              <strong className="text-sm font-spartan">Current Address:</strong>
              <div className="font-spartan text-sml" > {selectedUser.personalInfo.currentaddress}</div>
            </div>
          </div>
        </div>
        

        <div className={`${styles.educationcard}`}>
          <div className={`${styles.cardheader} justify-between`}>
            <div className="flex gap-3 text-lg font-spartan">
              <MdSchool style={{ color: "white", marginRight: "8px" }} />
              Education Information
            </div>
            <div className=""></div>
          </div>
          {selectedUser.education?.map((edu) => (
            <div className={`${styles.cardbody}`} key={edu._id}>
              <div className={`${styles.cardrow}`}>
                <strong className="text-sm font-spartan">Degree Name:</strong>
                <div className="text-sm font-spartan">{edu.DegreeName}</div>
              </div>

              <div className={`${styles.cardrow}`}>
                <strong className="text-sm font-spartan">Institute Name:</strong>
                <div className="text-sm font-spartan"> {edu.InstituteName}</div>
              </div>
              {/* <div className={`${styles.cardrow}`}>
              <strong className="text-sm">Degree Level:</strong>
              <div> {edu.DegreeLevel}</div>
            </div> */}
              <div className={`${styles.cardrow}`}>
                <strong className="text-sm font-spartan">Degree Specialization:</strong>
                <div className="text-sm font-spartan"> {edu.DegreeSpecialization}</div>
              </div>
              <div className={`${styles.cardrow}`}>
                <strong className="text-sm font-spartan">CGPA:</strong>
                <div className="text-sm font-spartan"> {edu.CGPA}</div>
              </div>
            </div>
          ))}
        </div>

      

        <div className={`${styles.educationcard}`}>
          <div className={`${styles.cardheader} justify-between`}>
            <div className="flex gap-3 text-lg font-spartan">
              <LuLassoSelect
                style={{ color: "white", marginRight: "8px" }}
              />
              Internship Preference Information
            </div>
            <div className=""></div>
          </div>
          <div className={`${styles.cardbody}`}>
            <div className={`${styles.cardrow}`}>
              <strong className="text-sm font-spartan">Preferred Function:</strong>
              <div>
                <div className="text-sm font-spartan">
                  {Array.isArray(
                    selectedUser.internshipPreference.preferredFunction
                  )
                    ? selectedUser.internshipPreference.preferredFunction.join(
                        ", "
                      )
                    : selectedUser.internshipPreference.preferredFunction}
                </div>
              </div>
            </div>

            <div className={`${styles.cardrow}`}>
              <strong className="text-sm font-spartan">Location:</strong>
              <div className="text-sm font-spartan"> {selectedUser.internshipPreference.location}</div>
            </div>
          </div>
        </div>


        <div className={`${styles.educationcard}`}>
          <div className={`${styles.cardheader} justify-between`}>
            <div className="flex gap-3 text-lg font-spartan">
              <MdWork style={{ color: "white", marginRight: "8px" }} />
              Work Experience Information
            </div>
            <div className=""></div>
          </div>
          {selectedUser.workExperience.map((work) => (
            <div key={work._id}>
              <div className={`${styles.cardbody}`}>
                <div className={`${styles.cardrow}`}>
                  <strong className="text-sm font-spartan">Position Held:</strong>
                  <div className="font-spartan text-sm"> {work.PositionHeld}</div>
                </div>

                <div className={`${styles.cardrow}`}>
                  <strong className="text-sm font-spartan">Organization Name:</strong>
                  <div className="font-spartan text-sm"> {work.OrganizationName}</div>
                </div>
                <div className={`${styles.cardrow}`}>
                  <strong className="text-sm font-spartan">From Date:</strong>
                  <div className="font-spartan text-sm"> {new Date(work.FromDate).toLocaleDateString()}</div>
                </div>
                <div className={`${styles.cardrow}`}>
                  <strong className="text-sm font-spartan">To Date:</strong>
                  <div className="font-spartan text-sm"> {new Date(work.ToDate).toLocaleDateString()}</div>
                </div>
                <div className={`${styles.cardrow}`}>
                  <strong className="text-sm font-spartan">Presently Working:</strong>
                  <div className="font-spartan text-sm"> {work.PresentlyWorking ? "Yes" : "No"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
 </div>
     </div>
        )}
      </div>
    </BaseLayout>
  );
}
