// pages/index.js

import BaseLayout from "@/admincomponents/BaseLayout";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import styles from "./nextgen.module.css";
import * as XLSX from "xlsx";
import {
  MdCastForEducation,
  MdOutlineRefresh,
  MdPerson,
  MdRoomPreferences,
  MdSchool,
  MdWork,
} from "react-icons/md";
import { LuLassoSelect } from "react-icons/lu";
import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { RxDropdownMenu } from "react-icons/rx";
import Link from "next/link";
import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";
import { FcCancel, FcOk } from "react-icons/fc";
import {
  Request_To_accept_nextgen_application,
  Request_To_Reject_nextgen_application,
} from "@/server_requests/client_requests";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

import parseJwt from "@/components/parsetoken";
import { isTokenExpired } from "@/components/tokenUtils";
export default function Home() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [loading, setloading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [downloadloading, setdownloadloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [isValidToken, setIsValidToken] = useState(false);
  const [totalPages, setTotalPages] = useState(1); // State for total pages
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

  const fetchData = (page) => {
    setloading(true);
    fetch(`/api/nextgen?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          // Ensure data.data is an array
          const filteredData = data.data.filter(
            (item) =>
              item.appstatus !== "rejected" && item.appstatus !== "accepted"
          );
          setloading(true);
          setData(filteredData);
          setFilteredData(filteredData);
          setTotalPages(data.totalPages); // Set the total pages from the response
          setloading(false);
          console.log(filteredData);
        } else {
          console.error("Expected an array but got:", typeof data);
          // Handle the case where data is not an array, e.g., set an error state or log a message
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect( () => {
     checkTokenExpiration();
    fetchData(currentPage); // Fetch data for the current page
  }, [currentPage]);
  const RejectApplication = async (applicationId, email) => {
    await Request_To_Reject_nextgen_application(applicationId, email);

    toast.success("Application rejected successfully");
    // After deletion, refresh the list of applications
    const updatedApplications = data.filter((app) => app._id !== applicationId);

    setData(filteredData);
    setFilteredData(filteredData);
  };

  const AcceptApplication = async (applicationId, email) => {
    router.push(
      `/dashboard/sendemailfornextgen?applicationId=${applicationId}&email=${email}`
    );
  };

  const rejectnextgenwithmailApplication = async (applicationId, email) => {
    router.push(
      `/dashboard/sendemailfornextgenrejection?applicationId=${applicationId}&email=${email}`
    );
  };
  const handleSelectedApp = async (user) => {
    setSelectedUser(user);
  };
  const handleCheckboxChange = (value, id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  const handleSelectAll = (value, data) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = value;
    });
    if (value) {
      setSelectedRows(data.map((row) => row._id));
    } else {
      setSelectedRows([]);
    }
  };
  const reject_selected_app = async () => {
    selectedRows.forEach(async (rowId) => {
      const response = await Request_To_Reject_nextgen_application(
        rowId,
        "email"
      );

      const updatedApplications = filteredData.filter(
        (app) => app._id !== rowId
      );
      toast.success("Application rejected successfully");
      setFilteredData(updatedApplications);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedRows([]);
  };

  const accept_selected_app = async () => {
    selectedRows.forEach(async (rowId) => {
      const response = await Request_To_accept_nextgen_application(
        rowId,
        "email"
      );

      const updatedApplications = filteredData.filter(
        (app) => app._id !== rowId
      );
      toast.success("Application accepted successfully");
      setFilteredData(updatedApplications);
    });
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedRows([]);
  };
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase(); // Convert input value to lower case

    setSearchId(value);
    const filtered = data.filter((user) =>
      user._id.toLowerCase().includes(value)
    ); // Convert user IDs to lower case before comparison
    setFilteredData(filtered);
  };

  const downloadExcel = () => {
    setdownloadloading(true)
    fetch(`/api/nextgen?page=download`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          // Ensure data.data is an array
          const filteredData = data.filter(
            (item) =>
              item.appstatus !== "rejected" && item.appstatus !== "accepted"
          );
          setdownloadloading(false);
          const combinedData = filteredData.flatMap((user) => {
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
            const Useremail = {
              Login_Email: user.user_email,
            };
            const education = user.education.map((edu) => ({
              DegreeName: edu.DegreeName,
              InstituteName: edu.InstituteName,
              DegreeSpecialization: edu.DegreeSpecialization.join(", "),
              GraduationYear: edu.Graduation_year,
              CGPA: edu.CGPA,
            }));

            const internshipPreference = {
              PreferredFunction: Array.isArray(
                user.internshipPreference?.preferredFunction
              )
                ? user.internshipPreference.preferredFunction.join(", ")
                : user.internshipPreference?.preferredFunction ?? "Not specified",
              Location:
                user.internshipPreference?.location ?? "Location not specified",
            };

            const workExperience = user.workExperience.map((work) => ({
              PositionHeld: work.PositionHeld,
              OrganizationName: work.OrganizationName,
              FromDate: new Date(work.FromDate).toLocaleDateString(),
              ToDate: new Date(work.ToDate).toLocaleDateString(),
              PresentlyWorking: work.PresentlyWorking ? "Yes" : "No",
            }));

            return education.map((edu) => ({
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
          XLSX.writeFile(workbook, "totalApplications.xlsx");
        } else {
          console.error("Expected an array but got:", typeof data);
          // Handle the case where data is not an array, e.g., set an error state or log a message
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });



  };

  const downloadJson = () => {
    const jsonData = data.map((user) => ({
      _id: user._id,
      personalInfo: user.personalInfo,
      education: user.education,
      internshipPreference: user.internshipPreference,
      hasWorkExperience: user.hasWorkExperience,
      appstatus: user.appstatus,
      user_email: user.user_email,
      workExperience: user.workExperience,
      createdAt: user.createdAt,
      __v: user.__v,
    }));

    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "applications.json";
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <BaseLayout>
      <div>
        <div className="container mx-auto p-4  ">
          <div className="flex justify-center mt-4 ">
            <h1
              className={`${styles.headertext} text-2xl font-bold  text-[#ffcc00] mb-10`}
            >
          Haidri Beverages  Career Portal
            </h1>
          </div>
          {!selectedUser ? (
            <div>
              <div className="flex justify-between mb-5">
                <input
                  type="text"
                  placeholder="Search by ID"
                  value={searchId}
                  onChange={handleSearch}
                  className="py-0 px-2 border border-gray-300 w-72 rounded"
                />
                <div>
                  <button
                    className="p-1 bg-[#ffcc00] text-sm text-white rounded"
                    onClick={downloadExcel}
                  >   {downloadloading && (
                    <div className="flex"><div className="animate-spin ">
                      <MdOutlineRefresh /></div> Download Excel </div>
                  )}
                    {!downloadloading && (<div><DownloadIcon /> Download Excel </div>)}
                  </button>
                  <button
                    onClick={downloadJson}
                    className="p-1 bg-[#ffcc00] text-sm m-2 text-white rounded"
                  >
                    Download JSON
                  </button>
                </div>
              </div>
              <div>
                {selectedRows.length > 0 && (
                  <div className="flex gap-5 mb-2">
                    <div>
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          handleSelectAll(e.target.checked, filteredData)
                        }
                      />{" "}
                      <span className="text-sm font-spartan mt-3">
                        Select All
                      </span>
                    </div>
                    <button
                      onClick={reject_selected_app}
                      className="bg-[#cab4b4] p-2 rounded-lg"
                    >
                      <div className="flex">
                        <FcCancel color="red" size={15} mr={2} />
                      </div>
                    </button>
                    <button
                      onClick={accept_selected_app}
                      className="bg-[#9bbca4] p-2 rounded-lg"
                    >
                      <div className="flex">
                        <FcOk color="red" size={15} mr={2} />
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center bg-[#4F3F00] rounded-lg items-center h-[70vh]">
                  <span class={`${styles.loader}`}></span>
                </div>
              ) : <div className="max-h-[calc(100vh-200px)]  overflow-y-auto">
                {filteredData?.map((user, index) => (
                  <div key={index} className="flex ">
                    <input
                      className="mt-3"
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckboxChange(e.target.checked, user._id)
                      }
                    />
                    <div
                      key={user._id}
                      className="bg-white border-b-2 rounded p-2  mb-4 cursor-pointer"
                      onClick={() => handleSelectedApp(user)}
                    >
                      <div className="flex items-center gap-4">
                        <FaUser className="text-[#ffcc00] mt-5" size={16} />
                        <div className="grid mt-6 grid-cols-5 gap-4">
                          <p className="flex gap-2  w-[220px]">
                            <span className="text-sm font-spartan font-bold">
                              Name:{" "}
                            </span>
                            <span className="text-sm font-spartan">
                              {user.personalInfo.name}
                            </span>
                          </p>
                          <p className="flex gap-2">
                            <span className="text-sm font-spartan font-bold">
                              CNIC:
                            </span>
                            <span className="text-sm font-spartan">
                              {user.personalInfo.cnic}
                            </span>
                          </p>
                          <p className="flex gap-2">
                            <span className="text-sm font-spartan font-bold">
                              Phone:
                            </span>
                            <span className="text-sm font-spartan">
                              {user.personalInfo.mobile}
                            </span>
                          </p>
                          <p className="flex gap-2">
                            <span className="text-sm font-spartan font-bold">
                              Email:
                            </span>
                            <span className="text-sm font-spartan">
                              {user.personalInfo.email}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>}
            </div>
          ) : (
            <div className=" shadow-md rounded p-6 ">
              <div className="flex justify-between">
                <button
                  className="mb-4 pl-10 pr-10 p-1 font-spartan text-sm bg-[#ffcc00] text-white rounded"
                  onClick={() => setSelectedUser(null)}
                >
                  Back
                </button>
                <div className="flex justify-end mb-5 ">
                  <Menu>
                    <IconButton
                      as={MenuButton}
                      aria-label="Options"
                      icon={<RxDropdownMenu size={25} />}
                      variant="unstyled"
                      _focus={{ outline: "none" }}
                    />
                    <MenuList
                      bg="white"
                      className="p-4c rounded-lg text-sm font-spartan p-2  space-y-1"
                    >
                      <MenuItem
                        className="hover:bg-[#ffcc00] p-1 rounded"
                        onClick={() =>
                          AcceptApplication(
                            selectedUser._id,
                            selectedUser.user_email
                          )
                        }
                      >
                        <Icon color="red" as={FcOk} w={5} h={5} mr={2} />
                        <span className="hover:text-white ">
                          Accept Application
                        </span>
                      </MenuItem>
                      <MenuItem
                        className="hover:bg-[#ffcc00] p-1 rounded"
                        onClick={() =>
                          RejectApplication(
                            selectedUser._id,
                            selectedUser.user_email
                          )
                        }
                      >
                        <Icon color="red" as={FcCancel} w={5} h={5} mr={2} />
                        <span className="hover:text-white ">
                          Reject Application
                        </span>
                      </MenuItem>
                      <MenuItem
                        className="hover:bg-[#ffcc00] p-1 rounded"
                        onClick={() =>
                          rejectnextgenwithmailApplication(
                            selectedUser._id,
                            selectedUser.user_email
                          )
                        }
                      >
                        <Icon color="red" as={FcCancel} w={5} h={5} mr={2} />
                        <span className="hover:text-white ">
                          Reject Application With Message
                        </span>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
              <div className="max-h-[calc(97vh-200px)] overflow-y-auto">
                <div className={`${styles.educationcard}`}>
                  <div className={`${styles.cardheader} justify-between`}>
                    <div className="flex gap-3">
                      <MdPerson
                        style={{ color: "white", marginRight: "8px" }}
                      />
                      <span className="text-lg font-spartan">
                        Personal Information
                      </span>
                    </div>
                    <div className=""></div>
                  </div>
                  <div className={`${styles.cardbody}`}>
                    <div className={`${styles.cardrow}`}>
                      <strong className="text-sm font-spartan ">
                        Unique ID:
                      </strong>
                      <div className="font-spartan text-sml">
                        {selectedUser._id}
                      </div>
                    </div>
                    <div className={`${styles.cardrow}`}>
                      <strong className="text-sm font-spartan ">Name:</strong>
                      <div className="font-spartan text-sml">
                        {selectedUser.personalInfo.name}
                      </div>
                    </div>

                    <div className={`${styles.cardrow}`}>
                      <strong className="text-sm font-spartan ">Gender:</strong>
                      <div className="font-spartan text-sml">
                        {selectedUser.personalInfo.gender}
                      </div>
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
                      <div className="font-spartan text-sml">
                        {selectedUser.personalInfo.email}
                      </div>
                    </div>
                    <div className={`${styles.cardrow}`}>
                      <strong className="text-sm font-spartan">Mobile:</strong>
                      <div className="font-spartan text-sml">
                        {selectedUser.personalInfo.mobile}
                      </div>
                    </div>
                    <div className={`${styles.cardrow}`}>
                      <strong className="text-sm font-spartan">CNIC:</strong>
                      <div className="font-spartan text-sml">
                        {selectedUser.personalInfo.cnic}
                      </div>
                    </div>
                    <div className={`${styles.cardrow}`}>
                      <strong className="text-sm font-spartan">City:</strong>
                      <div className="font-spartan text-sml">
                        {selectedUser.personalInfo.city}
                      </div>
                    </div>

                    <div className={`${styles.cardrow}`}>
                      <strong className="text-sm font-spartan">
                        Permanent Address:
                      </strong>
                      <div className="font-spartan text-sml">
                        {selectedUser.personalInfo.permanentaddress}
                      </div>
                    </div>
                    <div className={`${styles.cardrow}`}>
                      <strong className="text-sm font-spartan">
                        LinkedIn Handle:
                      </strong>
                      <div className="font-spartan text-sml">
                        {selectedUser.personalInfo.linkedinhandle}
                      </div>
                    </div>

                    <div className={`${styles.cardrow}`}>
                      <strong className="text-sm font-spartan">
                        Current Address:
                      </strong>
                      <div className="font-spartan text-sml">
                        {selectedUser.personalInfo.currentaddress}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${styles.educationcard}`}>
                  <div className={`${styles.cardheader} justify-between`}>
                    <div className="flex gap-3 text-lg font-spartan">
                      <MdSchool
                        style={{ color: "white", marginRight: "8px" }}
                      />
                      Education Information
                    </div>
                    <div className=""></div>
                  </div>
                  {selectedUser.education?.map((edu) => (
                    <div className={`${styles.cardbody}`} key={edu._id}>
                      <div className={`${styles.cardrow}`}>
                        <strong className="text-sm font-spartan">
                          Degree Name:
                        </strong>
                        <div className="text-sm font-spartan">
                          {edu.DegreeName}
                        </div>
                      </div>

                      <div className={`${styles.cardrow}`}>
                        <strong className="text-sm font-spartan">
                          Institute Name:
                        </strong>
                        <div className="text-sm font-spartan">
                          {edu.InstituteName}
                        </div>
                      </div>

                      <div className={`${styles.cardrow}`}>
                        <strong className="text-sm font-spartan">
                          Degree Specialization:
                        </strong>
                        <div className="text-sm font-spartan">
                          {edu.DegreeSpecialization}
                        </div>
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
                      <strong className="text-sm font-spartan">
                        Preferred Function:
                      </strong>
                      <div>
                        <div className="text-sm font-spartan">
                          {Array.isArray(
                            selectedUser.internshipPreference.preferredFunction
                          )
                            ? selectedUser.internshipPreference.preferredFunction.join(
                              ", "
                            )
                            : selectedUser.internshipPreference
                              .preferredFunction}
                        </div>
                      </div>
                    </div>

                    <div className={`${styles.cardrow}`}>
                      <strong className="text-sm font-spartan">
                        Location:
                      </strong>
                      <div className="text-sm font-spartan">
                        {selectedUser.internshipPreference.location}
                      </div>
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
                          <strong className="text-sm font-spartan">
                            Position Held:
                          </strong>
                          <div className="font-spartan text-sm">
                            {work.PositionHeld}
                          </div>
                        </div>

                        <div className={`${styles.cardrow}`}>
                          <strong className="text-sm font-spartan">
                            Organization Name:
                          </strong>
                          <div className="font-spartan text-sm">
                            {work.OrganizationName}
                          </div>
                        </div>
                        <div className={`${styles.cardrow}`}>
                          <strong className="text-sm font-spartan">
                            From Date:
                          </strong>
                          <div className="font-spartan text-sm">
                            {new Date(work.FromDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className={`${styles.cardrow}`}>
                          <strong className="text-sm font-spartan">
                            To Date:
                          </strong>
                          <div className="font-spartan text-sm">
                            {new Date(work.ToDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className={`${styles.cardrow}`}>
                          <strong className="text-sm font-spartan">
                            Presently Working:
                          </strong>
                          <div className="font-spartan text-sm">
                            {work.PresentlyWorking ? "Yes" : "No"}
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

        <ToastContainer />
      </div>
      <div className={styles.paginationbuttons}>
        <button
          className="pl-4 pr-4 rounded-sm bg-[#FFCC00]"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pl-4 pr-4 rounded-sm bg-[#FFCC00]"
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </BaseLayout>
  );
}
