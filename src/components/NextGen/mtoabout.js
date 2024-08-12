import { useEffect } from "react";
import styles from "./mto.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function IdealCandidate() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="w-full min-h-screen  ">
      <div className="flex w-full  flex-col md:flex-row">
        <div className="lg:w-1/2 p-4">
          <div className="mt-5 flex justify-end md:mr-36" >
          {/* <div className="mt-5 flex justify-end md:mr-36" data-aos="fade-up"> */}
            <div className="w-24 h-24 bg-[#21C1F5] rounded-full"></div>
          </div>
          <div
            className="mt-4 md:ml-10 w-full md:w-[90%] "
            // data-aos="fade-right"
          >
            <h1 className="text-3xl md:text-7xl font-spartan w-full bg-[#EBEEF9] p-3">
              IDEAL CANDIDATE
            </h1>
            <div className="mt-6 md:mt-10">
              <div
                className={`text-gray-700 ${styles.textready} font-spartan   lg:text-[24px] justify-end`}
                // data-aos="fade-in"
              >
                - Embraces challenges and is driven to succeed
              </div>
              <div
                className={`text-gray-700 ${styles.textready} font-spartan  lg:text-[24px] justify-end`}
                // data-aos="fade-in"
                // data-aos-delay="100"
              >
                - Analyzes complex problems and develops innovative solutions
              </div>
              <div
                className={`text-gray-700 ${styles.textready} font-spartan  lg:text-[24px] justify-end`}
                // data-aos="fade-in"
                // data-aos-delay="100"
              >
                - Absorbs information quickly and thinks creatively
              </div>
              <div
                className={`text-gray-700 ${styles.textready} font-spartan  lg:text-[24px] justify-end`}
                // data-aos="fade-in"
                // data-aos-delay="100"
              >
                - Self-motivated and resilient
              </div>
              <div
                className={`text-gray-700 ${styles.textready} font-spartan  lg:text-[24px] justify-end`}
                // data-aos="fade-in"
                // data-aos-delay="100"
              >
                - Confident in their abilities
              </div>
              <div
                className={`text-gray-700 mt-10 ${styles.textready} font-spartan  lg:text-[24px] justify-end`}
                // data-aos="fade-in"
                // data-aos-delay="100"
              >
                We&apos;ll provide the support and guidance you need to reach your
                full potential, and team you up with our experienced
                professionals who are passionate about delivering exceptional
                results.
              </div>
            </div>
          </div>
          <div className="lg:flex justify-between hidden mt-4 md:mt-10">
            <div
              className="w-24 h-24 ml-4 md:ml-20 bg-[#FFC54A] rounded-full"
              // data-aos="fade-up"
            ></div>
            {/* <div className="bg-[#EBEEF9] p-4 md:pl-14" data-aos="fade-left">
              <div className="w-24 h-24 bg-[#2F2EA6] rounded-full"></div>
            </div> */}
          </div>
        </div>
        <div className="  w-[50.5%]  hidden lg:flex md:mt-0">
          <img
            src="/images/idealcandidate.png"
            alt="ideal candidate"
            className="w-full h-full object-cover"
            // data-aos="fade-in"
          />
        </div>
      </div>
    </div>
  );
}
