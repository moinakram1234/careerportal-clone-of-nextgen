import React from "react";
import Statusitems from "@/Data/dummystatusdata";
const ApplicationStatus = () => {
  return (
    <div className="flex mt-16 ml-12">
      {Statusitems.map((items) => {
        return (
          <div className="bg-white h-28 w-3/12 mr-10 shadow-sm rounded-lg">
            <span className="ml-4  mt-5 subpixel-antialiased text-gray-500 text-sm">
              {items.name}
            </span>
            <div className=" flex justify-around">
              <items.icon style={{ fontSize: "50px",color:"#005997" }} />
              <span className="mr-20 text-2xl mt-2 text-gray-500">
                {items.value}
              </span>
            </div>
            <div
              className={`text-white bg-opacity-50 divide-opacity-25 bg-t ml-48 mb-20 w-16 h-8 ${
                items.value > 0 ? "bg-green-400" : "bg-red-400"
              } items-center flex justify-center rounded-full`}
            >
              {items.value <= 0 ? <items.icondownarrow /> : <items.iconarrow />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationStatus;
