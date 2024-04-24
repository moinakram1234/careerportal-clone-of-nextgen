
import { CheckCircleIcon } from "@chakra-ui/icons";
import "aos/dist/aos.css"; // Import the AOS styles
import React, { useEffect } from "react";
import AOS from "aos";
import { useSelector } from "react-redux";
import Link from "next/link";
const data = [
  {
    title: "Student",
    description:
      "Students are individuals who are engaged in learning, typically within an educational institution such as a school or university. They strive to gain knowledge and skills to achieve their academic and career goals.",
    icon: CheckCircleIcon,
    url: "/students",
  },
  {
    title: "Graduate",
    description:
      "Graduates are individuals who have successfully completed a course of study, typically at a school or university. They have earned a degree or diploma and are ready to enter the workforce.",
    icon: CheckCircleIcon,
    url: "/graduates",
  },
  {
    title: "Experienced",
    description:
      "Experience is the knowledge and skills acquired through direct observation or participation in events or activities. It is the process of doing something and learning from it.",
    icon: CheckCircleIcon,
    url: "/experienced",
  },
];

const DataList = () => {
  const darkMode = useSelector((state) => state.darkMode);


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (<div className="flex flex-col   items-center">
    <h1 className="lg:text-3xl font-bold text-lg  rounded-t-2xl text-center bg-[#D7D4FF] p-5  " data-aos="fade-left ">Opportunities for Students, Graduates, and Professionals.


    </h1>
    <div className="lg:flex  lg:p-52 px-12 pt-10 gap-5 w-full   bg-[#D7D4FF] ">
       
      {data.map((item, index) => {
        let animation;
        if (index % 3 === 0) {
          animation = "fade-left";
        } else if (index % 3 === 1) {
          animation = "fade-up";
        } else {
          animation = "fade-right";
        }

        return (
          <div key={index} className=" flex justify-center   py-2">
            <div   data-aos={animation} class="max-w-sm    bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href={item.url} className="flex justify-center ">
              <img
                class="rounded-t-lg"
                src="/logo.png"
                width={100}
                alt="your Browser does not support the image tag"
              />
            </a>
            <div class="p-5">
              <a href={item.url}>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                 {item.title}
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.description}
              </p>
              <a
                href={item.url}
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
          </div>
        );
      })}
    </div></div>
  );
}

export default DataList;
