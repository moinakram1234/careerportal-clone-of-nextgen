import React, { useState, useEffect } from "react";
import { IoIosPeople } from "react-icons/io";
import { SlNote } from "react-icons/sl";
import { IoTodaySharp } from "react-icons/io5";
const DisplayStatus = ({ name, totalApplication, icon: IconComponent }) => {
  return (
    <div className="mt-16 ml-12 w-3/12">
      <div className="bg-white p-4 shadow-sm rounded-lg">
        <span className="ml-4 mt-2 text-gray-500 text-sm font-semibold">
          {name}
        </span>
        <div className="flex items-center mt-4">
          <IconComponent style={{ fontSize: "50px", color: "#005997", width: "50px", height: "50px" }} />
          <span className="ml-4 text-2xl text-gray-700 font-bold">
            {totalApplication}
          </span>
        </div>
      </div>
    </div>
  );
};


const filterDataByDate = (data, targetDate) => {
  return data.filter(item => {
    const createdAt = new Date(item.createdAt).toDateString(); // Use the correct property name 'createAt'
    return createdAt === targetDate;
  });
};


const ApplicationStatus = () => {
  const [totalpost, setTotalpost] = useState(null);
  const [totalapplication, setTotalapplication] = useState(null);
  const [todayPosts, setTodayPosts] = useState(null);
  const [todayApplications, setTodayApplications] = useState(null);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data.length);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    const fetchTodayData = async (url, setTodayData) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const today = new Date().toDateString();
        const todayData = filterDataByDate(data, today);
        setTodayData(todayData.length);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    fetchData(process.env.NEXT_PUBLIC_APP_URL, setTotalapplication);
    fetchData(process.env.NEXT_PUBLIC_URL, setTotalpost);
    fetchTodayData(process.env.NEXT_PUBLIC_APP_URL, setTodayApplications);
    fetchTodayData(process.env.NEXT_PUBLIC_URL, setTodayPosts);
  },{});

  return (
    <div className="flex">
      {/* DisplayStatus for Total Applications */}
      <DisplayStatus
        name={"Total Applications"}
        totalApplication={totalapplication}
        icon={IoIosPeople}
      />
      {/* DisplayStatus for Today's Applications */}
      <DisplayStatus
        name={"Today's Applications"}
        totalApplication={todayApplications}
        icon={IoTodaySharp}
      />
      {/* DisplayStatus for Total Posts */}
      <DisplayStatus name={"Total Posts"} totalApplication={totalpost} icon={SlNote} />
      {/* DisplayStatus for Today's Posts */}
      <DisplayStatus name={"Today's Posts"} totalApplication={todayPosts} icon={IoTodaySharp} />
    </div>
  );
};

export default ApplicationStatus;
