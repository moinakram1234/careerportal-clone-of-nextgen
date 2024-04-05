// pages/internship.js
import Head from "next/head";
import BaseLayout from "@/components/Baselayout";
import BottomSection from "@/components/bottomsection";
import styles from "@/components/Graduate_components/graduates.module.css";
import "aos/dist/aos.css"; // Import the AOS styles
import AOS from "aos";
import { useEffect } from "react";
import GraduationSection from "@/components/Graduate_components/GraduatesSection";
import JobsCard from "@/components/Graduate_components/Graduatesjobs";
export default function Internship() {


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div>
      <Head>
        <title>Graduates Program</title>
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
        <main >
    
          <div className={`${styles.bgimg} h-[100vh] pt-20`}>
  

        
          </div>
          <div className={`h-[100vh] p-20 `}>
            <GraduationSection />
          </div>{" "}
          <div className={`h-[100vh]  p-5 mb-11 ${styles.bg_img}`}>
          
        <JobsCard/>
        
        </div>{" "}
        </main>
      </BaseLayout>
      <BottomSection />
    </div>
  );
}
