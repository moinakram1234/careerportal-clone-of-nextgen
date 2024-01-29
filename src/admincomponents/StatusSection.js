import React, { useState, useEffect } from "react";
import { IoIosPeople } from "react-icons/io";
import { SlNote } from "react-icons/sl";
import { IoTodaySharp } from "react-icons/io5";

const DisplayStatus = ({ name, totalApplication, icon: IconComponent, animatePulse }) => {
  return (
    <div className="grid p-4 w-full mt-5">
      <div className="col-span-1 flex  justify-between rounded-lg border shadow bg-white p-4">
        <div className="flex w-full flex-col">
        {!animatePulse ?(<p className={`text-2xl font-bold  `}>
            {totalApplication}
          </p>):(<div className=" bg-slate-200 rounded-full animate-pulse w-12 h-12"><p className={`text-2xl font-bold  animate-pulse`}>
            
            </p></div>)}
       
       {!animatePulse ?(<p className="text-gray-700">{name}</p>):( <div className="mt-2 w-28 h-8 rounded animate-pulse bg-slate-200"><p className="text-gray-700 "></p></div>)}
        </div>
        {!animatePulse ? (
          <p className="my-1 flex min-w-[55px] items-center justify-center rounded-lg  font-semibold">
           <span>
  <IconComponent size={30} color="#FFC83D" />
</span>
          </p>
        ) : (
          <p className="my-1 flex min-w-[55px] animate-pulse items-center justify-center rounded-lg bg-slate-200 font-semibold">
            <span className="h-20 w-20">{/* Add your content here */}</span>
          </p>
        )}
      </div>
    </div>
  );
};

const filterDataByDate = (data, targetDate) => {
  return data.filter((item) => {
    const createdAt = new Date(item.createdAt).toDateString();
    return createdAt === targetDate;
  });
};

const ApplicationStatus = () => {
  const [animatePulse, setAnimatePulse] = useState(true);
  const [totalpost, setTotalpost] = useState(null);
  const [totalapplication, setTotalapplication] = useState(0);
  const [todayPosts, setTodayPosts] = useState(null);
  const [todayApplications, setTodayApplications] = useState(null);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data.length);
        setAnimatePulse(false);
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
  }, []); // Add dependencies if needed

  return (
    <div className="flex">
      {/* DisplayStatus for Total Applications */}
      <DisplayStatus
        name={"Total Applications"}
        totalApplication={totalapplication}
        icon={IoIosPeople}
        animatePulse={animatePulse}
      />
      {/* DisplayStatus for Today's Applications */}
      <DisplayStatus
        name={"Today's Applications"}
        totalApplication={todayApplications}
        icon={IoTodaySharp}
        animatePulse={animatePulse}
      />
      {/* DisplayStatus for Total Posts */}
      <DisplayStatus
        name={"Total Posts"}
        totalApplication={totalpost}
        icon={SlNote}
        animatePulse={animatePulse}
      />
      {/* DisplayStatus for Today's Posts */}
      <DisplayStatus
        name={"Today's Posts"}
        totalApplication={todayPosts}
        icon={IoTodaySharp}
        animatePulse={animatePulse}
      />
    </div>
  );
};

export default ApplicationStatus;
