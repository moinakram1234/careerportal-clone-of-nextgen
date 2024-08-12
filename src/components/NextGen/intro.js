import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./mto.module.css";
import { IoIosArrowDown } from "react-icons/io";
import ProgramOverview from "./programoverview";
import LearningJourney from "./learningjourney";
import ApplicationProcess from "./app_process";
import IdealCandidate from "./mtoabout";
import Footer from "./footer";
import { useRouter } from "next/router";
import Threedtext_test from "./threedtext_test";
import Readytounlock from "./readytounlock";
const Home = () => {
  const router = useRouter();
  const text = "NextGen Leaders Program";
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const Applynow = async () => {
    router.push(`/login`);
  };
  return (
    <>
      <div className="h-[100vh] w-full bg-[#29219b] absolute -z-20"></div>
      <div className="h-[100vh] flex justify-center items-center">
        <motion.div
          initial={{ width: "100%", height: "50%", zIndex: "30" }}
          animate={{
            width: "100%",
            height: "100%",
            backgroundColor: "#2f2ea6",
          }}
          transition={{ duration: 2 }} // Increase duration for a slower transition
        >
          <div className="flex w-full h-full items-center justify-center">
            <img
              src="/images/herologo.png"
              alt="Logo"
              className="w-96 h-40 md:w-[50%] md:h-[50%]"
            />
          </div>
          {/* Scroll Down Indicator */}
          <div className="absolute bottom-5 w-full text-center">
            <span className="cursor-pointer font-spartan text-white animate-bounce">
              Scroll down
            </span>
            <div className="text-white">&#x25BC;</div>
          </div>
          <button
            onClick={Applynow}
            className={`fixed bottom-4 z-20 font-spartan right-10 bg-[#2F2EA6] hover:bg-[#2F2EA6] text-white text-lg font-bold py-4 px-10 rounded border border-white ${styles.buttonBlink}`}
          >
            Apply Now
          </button>
        </motion.div>
      </div>
    
      {/* <div style={{ height: "70vh", width: "100vw" }}>
        <Threedtext_test />
      </div> */}
    </>
  );
};

export default Home;
