import React from "react";
import ApplicationDummydata from "@/Data/dummyApllicationData";
import {
  ViewApp,
  PersonNaneicon,
  Contacticon,
  HomeAddress,
  Degreeicon,
  Pdficon,
  Departmenticon,
  Coverlettericon,
} from "@/assets/CustomIcons";

const RecievedApplications = () => {
  return (
    <div className="flex flex-wrap ml-5">
      {ApplicationDummydata.map((data, index) => {
        return (
          <div
            key={index}
            className="m-5 h-72 w-2/5 bg-white rounded shadow-sm overflow-hidden"
          >
            <div className=" content-end float-right pr-5 pt-2 opacity-70 ">
              <i>
                {" "}
                <ViewApp />
              </i>
              {/* button */}
            </div>

            <div className="ml-5 pt-5 overflow-hidden flex  hover:bg-gray-200">
              <i>
                {" "}
                <PersonNaneicon />
              </i>
              <h2 className="ml-3 font-sans text-gray-600  ">
                {data.fullName}
              </h2>
            </div>

            {/* ... (other fields) */}

            {/* New Fields */}
            <div className="ml-5 pt-2 flex  hover:bg-gray-200">
              <i>
                {" "}
                <HomeAddress />
              </i>
              <span className="ml-3 font-sans text-gray-600">
                {data.address}
              </span>
            </div>

            <div className="ml-5 pt-2 flex  hover:bg-gray-200">
              <i>
                {" "}
                <span>{/* Your location icon */}</span>
              </i>
              <span className="ml-3 font-sans text-gray-600">
                {data.location}
              </span>
            </div>

            <div className="ml-5 pt-2 flex  hover:bg-gray-200">
              <i>
                {" "}
                <span>{/* Your job type icon */}</span>
              </i>
              <span className="ml-3 font-sans text-gray-600">
                {data.jobType}
              </span>
            </div>

            <div className="ml-5 pt-2 flex  hover:bg-gray-200">
              <i>
                {" "}
                <span>{/* Your post date icon */}</span>
              </i>
              <span className="ml-3 font-sans text-gray-600">
                {data.postDate}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecievedApplications;
