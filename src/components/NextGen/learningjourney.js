import React from "react";
import Image from "next/image";
import styles from "./mto.module.css";
const steps = [
  {
    title: "ORIENTATION",
    duration: "3 DAYS",
    image: "/images/orientation.webp",
  },
  {
    title: "ROLE ASSIGNMENT",
    duration: "365 DAYS",
    image: "/images/roleassignment.webp",
  },
  {
    title: "ROLE ROTATION",
    duration: "3-6 MONTHS",
    image: "/images/rolerotation.webp",
  },
  {
    title: "MID YEAR REVIEW",
    duration: "AFTER 6 MONTHS",
    image: "/images/midyearreview.webp",
  },
  {
    title: "FORMAL TRAINING",
    duration: "365 DAYS",
    image: "/images/formaltraining.webp",
  },
  {
    title: "FINAL REVIEW/OFFER",
    duration: "AFTER 12 MONTHS",
    image: "/images/finalreviewoffer.webp",
  },
];
export default function LearningJourney() {
  return (
    <div className="min-h-screen ">
  <div className="bg-[#2F2EA6] p-20 flex flex-col md:flex-row justify-center items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center">
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-full overflow-hidden flex justify-center items-center">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={100}
                  height={100}
                  style={{
                    borderRadius: "100%",
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div className="flex flex-col items-center mt-2 text-center">
                <h3 className="text-sm text-white bg-[#5E4EC4] p-1 rounded">
                  {step.title}
                </h3>
                <p className="text-sm text-white bg-[#21C1F5] p-1 rounded">
                  {step.duration}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden md:block border-t-2 border-dashed border-yellow-500 w-24 -mt-20 ml-0"></div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center flex-col lg:flex-row">
        <h1 className="text-4xl lg:text-7xl font-spartan font-bold lg:mt-10 lg:w-3/4 h-20 flex justify-center items-center text-white bg-[rgb(108,89,205)] p-2 lg:mb-4 text-center">
          YOUR LEARNING JOURNEY
        </h1>
      </div>
    
      <div className="ml-4 mt-5 space-y-5 lg:flex lg:justify-center lg:space-y-10">
   <div className={`${styles.textready}  w-[70%]  list-disc lg:text-[20px] list-inside justify-end`}>
  <li className={`text-gray-700 ${styles.textready} font-spartan  lg:text-[24px] justify-end`}>Continuous guidance from a dedicated supervisor or mentor.</li>
  <li className={`text-gray-700 ${styles.textready} font-spartan  lg:text-[24px] justify-end`}>Personalized assessment exercises to define your career goals and aspirations.</li>
  <li className={`text-gray-700 ${styles.textready} font-spartan  lg:text-[24px] justify-end`}>Rotations every 3-6 months to gain diverse experience and skills.</li>
  <li className={`text-gray-700 ${styles.textready} font-spartan  lg:text-[24px] justify-end`}>A development plan tailored to your unique needs and objectives.</li>
</div>
      </div>
     
    </div>
  );
}
