import React, { useState, useEffect } from "react";
import { IoIosDocument, IoIosPeople } from "react-icons/io";
import { SlNote } from "react-icons/sl";
import { IoTodaySharp } from "react-icons/io5";

const DisplayStatus = ({ name, totalApplication, icon: IconComponent, animatePulse }) => {
  return (
    <div className="grid pl-4  ">
      <div className="col-span-1 flex  justify-between rounded-lg border shadow bg-white p-4">
        <div className="flex w-full flex-col">
        {!animatePulse ?(<p className={`text-xl font-spartan font-bold  `}>
            {totalApplication}
          </p>):(<div className=" bg-slate-200 rounded-full animate-pulse w-12 h-12"><p className={`text-2xl font-bold  animate-pulse`}>
            
            </p></div>)}
       
       {!animatePulse ?(<p className="text-gray-700 text-sm font-spartan">{name}</p>):( <div className="mt-2 w-28 h-8 rounded animate-pulse bg-slate-200"><p className="text-gray-700 "></p></div>)}
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

const ApplicationStatus = ({refreshTrigger, onRefreshComplete, setIsLoading}) => {
  const [animatePulse, setAnimatePulse] = useState(true);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalUserswithoutapp, setTotalUserswithoutapp] = useState(null);
  const [totalapplication, setTotalapplication] = useState(0);
  const [todayPosts, setTodayPosts] = useState(null);
  const [todayApplications, setTodayApplications] = useState(null);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {

        const response = await fetch(url);
        const data = await response.json();
        setData(data.totalDocuments);
        setAnimatePulse(false);
        setIsLoading(false)
        onRefreshComplete();
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setTimeout(() => {
          onRefreshComplete();
        }, 3000); // 3000 milliseconds = 2 seconds
      }
    };


    const fetchusers = async (url, setData) => {
      try {

        const response = await fetch(url);
        const data = await response.json();
        setData(data.totalDocuments);
        setAnimatePulse(false);
        setIsLoading(false)
        setTimeout(() => {
          onRefreshComplete();
        }, 3000); // 3000 milliseconds = 2 seconds
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setTimeout(() => {
          onRefreshComplete();
        }, 3000); // 3000 milliseconds = 2 seconds
      }
    };
    const fetchuserswithoutapp = async (url, setData) => {
      try {

        const response = await fetch(url);
        const data = await response.json();
        setData(data.total);
        setAnimatePulse(false);
        setIsLoading(false)
        setTimeout(() => {
          onRefreshComplete();
        }, 3000); // 3000 milliseconds = 2 seconds
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setTimeout(() => {
          onRefreshComplete();
        }, 3000); // 3000 milliseconds = 2 seconds
      }
    };
    const fetchTodayData = async (url, setTodayData) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
    
        const options = { timeZone: 'Asia/Karachi' };
        const now = new Date();
        const today = new Date(now.toLocaleString('en-US', options)).toDateString();
        
        const todayData = filterDataByDate(data.data, today);
        setTodayData(todayData);
        setTimeout(() => {
          onRefreshComplete();
        }, 3000); // 3000 milliseconds = 2 seconds
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setTimeout(() => {
          onRefreshComplete();
        }, 3000); // 3000 milliseconds = 2 seconds
      }
    };
    

    fetchData(`/api/nextgen`, setTotalapplication);
    fetchusers(`/api/user`, setTotalUsers);
    fetchuserswithoutapp(`/api/usersWithoutApplications`, setTotalUserswithoutapp);
    fetchTodayData(`/api/nextgen`, setTodayApplications);

  },  [refreshTrigger]);

  return (
    <div className="flex">
      {/* DisplayStatus for Total Applications */}
      <DisplayStatus
        name={"Total Applications"}
        totalApplication={totalapplication}
        icon={IoIosDocument}
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
        name={"Total Users"}
        totalApplication={totalUsers}
        icon={IoIosPeople}
        animatePulse={animatePulse}
      />
          <DisplayStatus
        name={"Users whithout Apps"}
        totalApplication={totalUserswithoutapp}
        icon={IoIosPeople}
        animatePulse={animatePulse}
      />
    </div>
  );
};

export default ApplicationStatus;
