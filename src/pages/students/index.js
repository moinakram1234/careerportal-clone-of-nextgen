// pages/internship.js
import Head from "next/head";
import BaseLayout from "@/components/Baselayout";
import BottomSection from "@/components/bottomsection";
import styles from "@/components/Student_components/student.module.css";
import "aos/dist/aos.css"; // Import the AOS styles
import AOS from "aos";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useMediaQuery } from "@chakra-ui/react";
import { PepsiVideo } from "@/components/PepsiVideos";
import InternshipSection from "@/components/Student_components/InternshipSection";
export default function Internship() {
  const darkMode = useSelector((state) => state.darkMode);
  const currentYear = new Date().getFullYear();
  const [isLargerThan800] = useMediaQuery("(min-width: 1080px)");
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
    });

    window.addEventListener('scroll', () => {
      AOS.refresh();
    });
  }, []);
  return (
    <div>
      <Head>
        <title>Internship Program</title>
        <meta
          name="description"
          content="Learn about our internship program."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BaseLayout>
        <main className="">
        <div className={`${isLargerThan800 ? "h-screen mt-20 " : "  mt-20"}`}>
            <PepsiVideo />
          </div>
          <div
            className={` ${
              isLargerThan800
                ? "h-[100vh] mt-24 flex justify-center"
                : "flex flex-col  "
            }`}
          >
            <div
              className={`${
                isLargerThan800 ? "w-2/4 h-[100%] hidden" : " mt-5 "
              }`}
              data-aos="fade-down"
            >
           <img className="w-[100%] h-[100%]" 
     src="/images/student.svg" 
     alt="Description of the image" />
            </div>
            <div
              className={`${
                isLargerThan800 ? "w-2/4 pt-28 pl-20 space-y-2" : "p-3"
              }`}
            >
              <h1
                className={`${isLargerThan800 ? "text-3xl  mt-20 " : ""}${
                  styles.robotobold
                }`}
                data-aos="fade-up"
                style={{ color: darkMode ? "white" : "#000000" }}
              >
                Internship Program {currentYear}
              </h1>
              <p
                className={`  ${styles.roboto_light_italic}   ${
                  isLargerThan800 ? "text-start text-lg py-5" : "text-sm py-5"
                }  `}
                data-aos="fade-up"
                style={{ color: darkMode ? "white" : "#000000" }}
              >
                Our internship program is designed to help students gain
                experience and learn new skills. We offer internships in various
                departments, including marketing, engineering, and human
                resources. Our internships are paid and provide students with
                the opportunity to work on real projects and learn from industry
                professionals. If you are interested in gaining valuable
                experience and building your resume, we encourage you to apply
                for our internship program.
              </p>

              <button
                className={`  p-2 border-2 border-solid `}
                data-aos="fade-right"
              >
                <Link href="/jobs?tag=student">View Internships</Link>
              </button>
            </div>
            <div
              className={`${isLargerThan800 ? "w-2/4 h-[100%]" : "hidden"}`}
              data-aos="fade-down"
            >
         <img className="w-[100%] h-[100%]" 
     src="/images/student.svg" 
     alt="Description of the image" />
            </div>
          </div>
    
          <br></br>
          <div
            className={`${
              isLargerThan800 ? "h-[100vh] mt-20 py-20  p-10" : " p-5"
            } ${styles.bg_departement}`}
          >
            <InternshipSection />
          </div>{" "}
        </main>
        <br></br>
        <BottomSection />
      </BaseLayout>
    </div>
  );
}
