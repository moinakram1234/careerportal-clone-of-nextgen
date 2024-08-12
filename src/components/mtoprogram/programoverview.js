// pages/program-overview.js

import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./mto.module.css";
import { useEffect } from "react";
export default function ProgramOverview() {
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
    <div className=" flex items-center justify-center">
      <Head>
        <title>Program Overview</title>
      </Head>
      <div className="bg-[#002060] rounded-lg  p-8  min-h-screen flex flex-col md:flex-row ">
        <div className="md:ml-8 mt-6 md:mt-0 w-1/2" data-aos="fade-up">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Program Overview
            </h1>
            <hr className="w-[70%] mx-auto border border-white" />
          </div>{" "}
          <ul className="list-disc mt-10 list-inside text-gray-300 space-y-10 tracking-wide">
            <li className="text-lg  mb-2 text-left text-gray-300">
              We have a diverse and competitive work environment and right from
              the start you will be given a challenging hands on role. As
              Management Trainees you will be provided with ample support,
              guidance and will be encouraged to make your contributions to an
              organization built around teamwork.
            </li>
            <li className="text-lg  mb-2 text-left text-gray-300">
              Our program offers a mechanism for constant feedback and
              mentoring. With a solid focus on-job training you will be given
              opportunities to develop your expertise and secure valuable
              professional experience.
            </li>
            <li className="text-lg  mb-2 text-left text-gray-300">
              At the end of the MT program, a concise assessment of your
              performance and competence will confirm if you’re ready for a
              challenging career with us.
            </li>
          </ul>
        </div>
        <div className="w-1/2" data-aos="fade-right">
          <img
            src="./images/pgov.jpg"
            alt="Program Overview Image"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
