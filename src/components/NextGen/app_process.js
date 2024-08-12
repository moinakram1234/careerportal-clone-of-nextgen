import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function ApplicationProcess() {
  // Initialize AOS after components are rendered
  React.useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <div className="h-5 w-full bg-[#DCB96E]"></div>
      <div className="min-h-screen flex flex-col md:flex-row ">

        <div className="md:w-[70%]   lg:bg-[#2F2EA6] flex-1 relative">
          <div
            style={{
              width: "170px",
              height: "70px",
              borderRadius: "50% 0 100% 0",
              backgroundColor: "#5745BB",
            }}
            className="absolute hidden lg:flex -ml-14 -mt-0"
          ></div>
          <div className="w-full flex h-full justify-center items-center">
            <div className="w-full  lg:p-20 ">
              <div className="bg-[#6C59CD] text-center w-full lg:pl-20 p-5 p md:text-left">
                <h1 className="text-3xl md:text-7xl text-white p-1 font-spartan">SELECTION</h1>
                <h1 className="text-3xl md:text-7xl text-white p-1 font-spartan">PROCESS</h1>
              </div>
              <div className="lg:flex hidden  justify-center md:justify-end">
                <img
                  className="w-full md:w-32"
                  src="/images/selection.gif"
                  alt="Description of the image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2  flex-1">
          <img
            src="/images/selection.png"
            alt="Descriptive text for the image"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default ApplicationProcess;
