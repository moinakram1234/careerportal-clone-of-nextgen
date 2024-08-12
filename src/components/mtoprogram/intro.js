import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./mto.module.css";
import { HiMiniArrowUturnDown } from "react-icons/hi2";

export default function Home() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const letterAnimation = {
    hidden: {
      y: -50,
      opacity: 0,
    },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const renderAnimatedText = (text, customStyle) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        custom={index}
        initial="hidden"
        animate="visible"
        variants={letterAnimation}
        style={{ display: "inline-block", ...customStyle }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <>
      <div
        className={`min-h-screen bg-gray-100 py-6 flex flex-col items-center ${styles.mtobg} justify-center`}
      >
        <button
          className={`${styles.applynowbutton}`}
          onClick={scrollToBottom}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            cursor: "pointer",
          }}
        >
          <div className={`${styles.blink}`}>
            <HiMiniArrowUturnDown size={25} />
          </div>
          <span>APPLY NOW</span>
        </button>
        <img
          className={`${styles.rotatelogo} w-32 h-32 mb-10`}
          src="/logo.png"
          alt="logo"
        />
        <h1 className={`text-4xl font-bold mb-6 text-white ${styles.animatefadeslideup}`}>
          {renderAnimatedText("Management", { color: "#fff" })}
          {renderAnimatedText(" Trainee Program", { color: "#ED1C24" })}
        </h1>
        <p className="text-gray-300 mb-3">
          Show us your potential and join our team by filling in the details
          below. Your journey towards a rewarding career starts here. Let's
          embark together on this exciting adventure!
        </p>
        <div className="flex gap-5 mt-10">
          <motion.div
            className="text-4xl text-white"
            initial="hidden"
            animate="visible"
            variants={letterAnimation}
          >
            Unleash
          </motion.div>
          <motion.div
            className="text-4xl text-white bg-[#ED1C24] pl-5 pr-5 pt-1 pb-1 rounded-lg"
            initial="hidden"
            animate="visible"
            variants={letterAnimation}
          >
            Potential
          </motion.div>
        </div>
      </div>
    </>
  );
}
