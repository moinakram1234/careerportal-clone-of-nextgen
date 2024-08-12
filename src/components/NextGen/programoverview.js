import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./mto.module.css";
const Programoverview = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = scrollY / 2;

  return (
    <div className="md:flex md:flex-wrap lg:mt-0  min-h-screen ">
        <div className="h-5 w-full bg-[#DCB96E] lg:hidden"></div>
   <div className="w-full lg:w-1/2 hidden lg:block">
  <div className="flex flex-wrap h-3/4 w-full">
    <div className="w-full lg:w-[50%] rounded-br-full rounded-bl-full h-full bg-[#2F2EA6] z-10 lg:ml-3 border">
      <div className="h-[30%] w-full flex" data-aos="fade-right">
        <div className="h-full w-[50%] rounded-br-full rounded-bl-full bg-[#6C59CD]"></div>
        <div className="absolute right-0 w-[50%] z-10 rounded-bl-full rounded-br-full h-[100%]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FEB7B2] w-[100%] aspect-w-1 aspect-h-1 rounded-full overflow-hidden">
          <img
            src="/images/programoeverview1.png"
            alt="Descriptive text"
            className="w-full h-full object-cover rounded-full"
            data-aos="zoom-in-up"
          />
        </div>
      </div>
      </div>
      <div className="h-[60%] w-full flex">
        <div className="relative w-[50%] h-[100%]  hidden md:block">
        <div className="rounded-full w-full h-full bg-[#FEB7B2]"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full aspect-w-1 aspect-h-1 bg-[#4D899E] rounded-full overflow-hidden">
            <img
              src="/images/programoeverview2.png"
              alt="programoverview"
              className="w-full h-full object-cover rounded-full"
              data-aos="zoom-in-up"
            />
          </div>
        </div>
        <div className="relative w-[50%] h-[100%]">
          <div className="rounded-full w-full h-full bg-[#21C1F5]"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-[50%]  rounded-full overflow-hidden">
          <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FEB7B2] w-[100%] aspect-w-1 aspect-h-1 rounded-full overflow-hidden">
          <img
            src="/images/po3.png"
            alt="Descriptive text"
            className="w-full h-full object-cover rounded-full"
            data-aos="zoom-in-up"
          />
        </div>
          </div>
        </div>
      </div>
    </div>
    <div className="relative w-full lg:w-[40%] rounded-br-full rounded-bl-full h-[70%] -ml-3 lg:-ml-10 bg-[#4D899E]">
    <div className="absolute right-0 bg-[#67AEA7] w-[50%] z-10 rounded-bl-full rounded-br-full h-[50%]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#ffcc00] w-[100%] aspect-w-1 aspect-h-1 rounded-full overflow-hidden">
          <img
            src="/images/programoeverview4.png"
            alt="Descriptive text"
            className="w-full h-full object-cover rounded-full"
            data-aos="zoom-in-up"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#2C6CFA] w-full h-[60%] rounded-full">
        <div className="absolute top-0 left-0 bg-[#21C1F5] w-[40%] h-[40%] rounded-full"></div>
        <div className="absolute bottom-3 right-4  w-[70%] h-[75%] rounded-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[100%] aspect-w-1 aspect-h-1 rounded-full overflow-hidden">
          <img
            src="/images/po51.png"
            alt="Descriptive text"
            className="w-full h-full object-cover rounded-full"
            data-aos="zoom-in-up"
          />
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
      <div className="w-full lg:w-1/2 relative">
        <main className="flex flex-col items-center justify-center p-4">
          <div className="w-full lg:w-[100%] relative">
            <h1
              className="lg:text-6xl text-3xl mt-20 font-bold text-center mb-4 relative "
              data-aos="fade-in"
            >
              <div className="absolute font-spartan rounded-full  w-24 h-24 -z-20 -m-10 bg-[#EBEEF9]"></div>
              PROGRAM OVERVIEW
              <div className="flex justify-end mt-9 relative z-20">
                <div className="absolute rounded-full w-10 h-10 -m-10 mr-10 bg-[#febfb2]"></div>
              </div>
            </h1>
            <div className=" flex justify-center ">
   <div className="lg:w-[100%] flex flex-col items-center justify-center">
  <p className={`text-gray-700 font-spartan  ${styles.textready} text-center w-[80%]  lg:text-[24px]`} 
     
    >
      Embark on a challenging, hands-on adventure from day one. Our
      NextGen Leaders Program offers a dynamic and supportive
      environment with guidance, feedback, and on-the-job training.
      Develop your expertise, gain valuable experience, and get
      ready to launch a rewarding career.
    </p>
    <p className={`text-gray-700 font-bold font-spartan ${styles.textready} text-center w-[80%] h-full lg:text-[24px]`} 
    
    >
      Program Duration: 1 Year
    </p>
</div>
            </div>
          </div>
        </main>
        <div class={`${styles.parentcontainert}`}>
          <div className="mt-32 relative z-10" data-aos="fade-up">
            <div className="rounded-full w-24 h-24  bg-[#6C59CD]"></div>
          </div>
          <div
            className="flex justify-end  relative z-10"
            data-aos="fade-down"
          >
            <div className="w-32 h-32 bg-[#21C1F5]  rounded-bl-full rounded-tl-full rounded-tr-full"></div>
          </div>

          <div class={`${styles.overlappingcontent}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Programoverview;
