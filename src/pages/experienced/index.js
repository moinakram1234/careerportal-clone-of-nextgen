// pages/internship.js
import Head from "next/head";
import BaseLayout from "@/components/Baselayout";
import BottomSection from "@/components/bottomsection";
import styles from "@/components/Experiened_components/experience.module.css";
import "aos/dist/aos.css"; // Import the AOS styles
import AOS from "aos";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import ExperiencedSection from "@/components/Experiened_components/experianceSection";
import JobsCard from "@/components/Experiened_components/experiencejobs";
export default function Internship() {
  const darkMode = useSelector((state) => state.darkMode);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    AOS.init({ duration: 1000 });
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
          <div className="h-[100vh] flex justify-center ">
            <div className="w-2/4 pt-28 pl-20 space-y-2 ">
              <h1
                className={`text-3xl  mt-20 ${styles.robotobold}`}
                data-aos="fade-up"
                style={{ color: darkMode?'white':'#000000' }} 
              >
             Experienced Program {currentYear}
              </h1>
              <p
                className={` text-start text-lg py-5 ${styles.roboto_light_italic}`}
                data-aos="fade-up"
                style={{ color: darkMode?'white':'#000000' }} 
              >
                Our Experienced program is designed to help students gain
                experience and learn new skills. We offer internships in various
                departments, including marketing, engineering, and human
                resources. Our internships are paid and provide students with
                the opportunity to work on real projects and learn from industry
                professionals. If you are interested in gaining valuable
                experience and building your resume, we encourage you to apply
                for our internship program.
              </p>

              <button
  className={`bg-[#504ED7] text-white p-2 rounded-lg `}
  data-aos="fade-right"
>
  <Link href="/jobs?tag=experienced">
  View jobs
  </Link>
</button>
            </div>
            <div className="w-2/4 h-[100%]" data-aos="fade-down">
                <video className="w-[90%] h-[100%]" autoPlay loop muted>
                    <source src="https://cdnl.iconscout.com/lottie/premium/thumb/man-doing-data-analysis-4916288-4095836.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
          </div>
          <div
            className={`h-[100vh] p-20 ${styles.bg_departement}`}
          >
            <ExperiencedSection />
          </div>{" "}
          <div
            className={`h-[100vh] p-20 ${styles.exp_job} `}
          >
           <JobsCard/>
      
          </div>{" "}
        </main>
      </BaseLayout>
      <br></br>
           <br></br>
      <BottomSection />
    </div>
  );
}
