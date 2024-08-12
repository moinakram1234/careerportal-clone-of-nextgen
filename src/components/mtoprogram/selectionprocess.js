import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaUserCircle,
  FaCheckCircle,
  FaRegUserCircle,
  FaFileAlt,
  FaRegFileAlt,
  FaRegCheckCircle,
  FaUsers,
  FaUserCog,
  FaRegWindowClose,
} from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa6";
const SelectionProcess = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
    });

    window.addEventListener("scroll", () => {
      AOS.refresh();
    });
  }, []);
  return (
    <>
      {" "}
      <div className="flex  items-center">
        <hr className="h-[1px] flex-grow bg-gradient-to-r from-gray-300 to-gray-500" />
        <h1 className="text-2xl font-bold  mb-4">Our Selecttion Process</h1>
        <hr className="h-[1px] flex-grow bg-gradient-to-r from-gray-300 to-gray-500" />
      </div>
      <div className="flex mt-5 justify-center ">
        <div className="w-full bg-[#002060] md:w-1/2 flex flex-col p-2 space-y-9">
          <div data-aos="fade-right">
            <Step
              number={1}
              icon={<FaFileAlt className="text-black text-xl mr-2" />}
              description="Submit job application & CV"
            />
          </div>
        <div data-aos="fade-left">
        <Step
            number={2}
            icon={<FaRegFileAlt className="text-black text-xl mr-2" />}
            description="Appear for Test/Assessment Center"
          />
        </div>
      <div data-aos="fade-right">
      <Step
            number={3}
            icon={<FaUsers className="text-black text-xl mr-2" />}
            description="First Interview with Line & HR"
          />
      </div>
         <div data-aos="fade-left">
         <Step
            number={4}
            icon={<FaUserCog className="text-black text-xl mr-2" />}
            description="Panel Interview"
          />
         </div>
    <div data-aos="fade-right">
    <Step
            number={5}
            icon={<FaCheckCircle className="text-black text-xl mr-2" />}
            description="Selection"
          />
    </div>
          <ProgressBars />
          <ProgressDots />
        </div>
      </div>
    </>
  );
};

const Step = ({ number, icon, description }) => (
  <div className="flex flex-col">
    <div className="flex items-center justify-center  rounded bg-green-100 mb-2">
      <span className="text-green-600  text-2xl text-center ">{number}</span>
    </div>
    <div className="bg-yellow-100 p-2 rounded-md flex items-center">
      {icon}
      <span className="text-black font-semibold">{description}</span>
    </div>
  </div>
);

const ProgressBars = () => (
  <div className="mt-10 flex items-center justify-center w-full">
    {Array.from({ length: 12 }, (_, i) => (
      <div key={i} className="h-2 w-full bg-blue-400 mr-1"></div>
    ))}
  </div>
);

const ProgressDots = () => (
  <div className="mt-10 flex items-center justify-center">
    {Array.from({ length: 12 }, (_, i) => (
      <div key={i} className="h-4 w-4 rounded-full bg-yellow-500 mr-2"></div>
    ))}
  </div>
);

export default SelectionProcess;
