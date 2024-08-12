import { motion } from "framer-motion";
import Head from "next/head";
//...
import React from 'react';
export default function LearningJourney() {
  const imgRef = React.createRef();
  const [imageVisible, setImageVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const imgTop = imgRef.current.offsetTop;
      const imgHeight = imgRef.current.offsetHeight;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollTop + windowHeight > imgTop && scrollTop < imgTop + imgHeight) {
        setImageVisible(true);
      } else {
        setImageVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="  ">
      <Head>
        <title>Your Learning Journey</title>
      </Head>
      <div className=" rounded-lg h-[100vh] p-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Your Learning Journey
          </h1>
          <ul className="list-disc mt-10 list-inside text-gray-700 space-y-6 tracking-wide">
            <li className="mb-2">
              We will assign you a supervisor as soon as you start. Your
              supervisor will hold a personal assessment exercise which will
              help you decide what you want from your career and the best way to
              achieve it.
            </li>
            <li className="mb-2">
              The outcome of this discussion is captured in your development
              plan. The program duration is one year but if you develop the
              required skill set and if an entry level role is available in the
              same domain, there are chances to graduate from the program even
              before spending one year with us.
            </li>
            <li className="mb-2">
              We believe you learn faster, when you’re challenged. In other
              words, we inspire you to progress in your career and achieve new
              heights.
            </li>
          </ul>
        </div>

        <div className="md:w-1/2 p-6 flex flex-col items-center justify-center">
          <motion.img
            ref={imgRef}
            src="./images/lp.png"
            alt=""
            initial={{ scale: 0, rotate: 0 }}
            animate={imageVisible? { scale: 1, rotate: 360 } : { scale: 0, rotate: 0 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </div>
  );
}