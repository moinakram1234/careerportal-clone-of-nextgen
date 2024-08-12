import BaseLayout from "@/admincomponents/BaseLayout";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import styles from "./nextgen.module.css";
import { DownloadIcon } from "@radix-ui/react-icons";
import * as XLSX from "xlsx";
import { MdOutlineRefresh } from "react-icons/md";
import { isTokenExpired } from "@/components/tokenUtils";
import parseJwt from "@/components/parsetoken";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [downloadloading, setdownloadloading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [totalPages, setTotalPages] = useState(1); // State for total pages
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
  const fetchData = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/usersWithoutApplications`);
      const data = await res.json();
    
      if (res.ok) {
        setLoading(false)
        setUser(data.users);
        setTotalPages(data.totalPages); // Set the total pages from the response
      
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkTokenExpiration();
    fetchData(currentPage); // Fetch data for the current page
  }, [currentPage]);
  const downloadExcel = async () => {
    try {
  
        // Maps to store unique users by _id and Email separately
        const uniqueByIdMap = new Map();
        const uniqueEmailsSet = new Set();

      user.forEach((user) => {
          // Check for uniqueness by _id
          if (!uniqueByIdMap.has(user._id)) {
            uniqueByIdMap.set(user._id, {
              _id: user._id,
              Email: user.email,
              Mobile: user.Phone,
              CNIC: user.CNIC,
              userPassword: user.userPassword,
              isAdmin: user.isAdmin,
              otp: user.otp,
              createdAt: user.createdAt,
              __v: user.__v,
            });
          }

          // Check for uniqueness by Email
          if (!uniqueEmailsSet.has(user.email)) {
            uniqueEmailsSet.add(user.email);
          } else {
            // If the Email already exists, remove the user from the map based on _id
            uniqueByIdMap.delete(user._id);
          }
        });

        // Convert the map values to an array
        const combinedData = Array.from(uniqueByIdMap.values());

        // Create a new workbook and add the data to it
        const workbook = XLSX.utils.book_new();
        const combinedSheet = XLSX.utils.json_to_sheet(combinedData);
        XLSX.utils.book_append_sheet(workbook, combinedSheet, "Combined Data");

        // Write the workbook to a file
        XLSX.writeFile(workbook, "Totalusers.xlsx");
  
    } catch (err) {
      setError("Failed to fetch data");
    } 
  };

  const downloadJson = () => {
    const jsonData = user.map((user) => ({
      _id: user._id,
      email: user.email,
      userPassword: user.userPassword,
      isAdmin: user.isAdmin,
      otp: user.otp,
      CNIC: user.CNIC,
      Phone: user.Phone,
      createdAt: user.createdAt,
      __v: user.__v,
    }));

    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <BaseLayout>
      <div
        className={`${styles.headertext} font-spartan flex justify-center p-10 text-3xl`}
      >
        Registered Users
      </div>
      <div className="flex justify-end mr-5">
      <div>
      <button
          className="py-0.5 px-1 bg-[#ffcc00] text-sm text-white rounded"
          onClick={downloadExcel}
        >
          {downloadloading ? (
            <div className="flex items-center">
              <div className="animate-spin">
                <MdOutlineRefresh />
              </div>
              <div className="ml-2">Download Excel</div>
            </div>
          ) : (
            <div className="flex items-center">
              <DownloadIcon />
              <div className="ml-2">Download Excel</div>
            </div>
          )}
        </button>
      </div>
       <div>
       <button
          className="p-1 bg-[#ffcc00] font-spartan text-sm flex gap-2 mb-5 ml-3 text-white rounded"
          onClick={downloadJson}
        >
          <DownloadIcon /> Download JSON
        </button>
       </div>
      </div>
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {user ? (
          <div>
          {user.map((user, index) => (
            <div key={index}>
              <div
               
                className="bg-white border-b-2 rounded p-4 mb-4 cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center gap-4">
                  <FaUser className="text-[#ffcc00]" size={18} />
                  <div className="grid grid-cols-4 text-sm space-x-5">
                    <p className="w-[270px] font-spartan">
                      <strong>User Email:</strong> {user.email}
                    </p>
                    <p className="font-spartan">
                      <strong>CNIC:</strong> {user.CNIC}
                    </p>
                    <p className="font-spartan">
                      <strong>Phone:</strong> {user.Phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="flex justify-center bg-[#4F3F00] rounded-lg items-center h-[70vh]">
          <span class={`${styles.loader}`}></span>
         </div>
        )}
      </div>

    
    </BaseLayout>
  );
};

export default Home;
