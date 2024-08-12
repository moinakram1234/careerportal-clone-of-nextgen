import { useEffect, useState } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";;
import styles from "./mto.module.css";
const AboutUs = () => {
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
        <div className={`${styles.fullPageImage}`} >
               <div className="flex h-screen  ">
     <div className={`place-content-center ml-10  p-8 w-[50%] `}>
        {/* <div className="flex mb-6 ">
          <img src="/logo.png" alt="Pepsi Logo" className="w-24 h-24"  />
        </div> */}
       <div className=" p-10 rounded-lg">
       <h2 className="text-3xl  font-bold mb-4 text-left p-2 " data-aos="fade-right">About Us...</h2>
      <div data-aos="fade-left">
      <p className=" text-lg  mb-4 text-left  text-gray-500 ">
         
         We are one of the largest franchise groups of Pepsi Cola International,
         </p>
       <p className=" text-lg  mb-4 text-left text-gray-500  ">
         covering the whole AJK, KPK, Gilgit-Baltistan, Federal Capital adventure
       </p>
       <p className=" text-lg  mb-4 text-left text-gray-500  ">
        Northern Punjab. We are the bottler of all SKUs of Pepsi Cola products</p>
       <p className=" text-lg  mb-4 text-left text-gray-500  ">
       as per approved quality standards of Pepsi Cola International. Our 
       </p>
       <p className=" text-lg  mb-4 text-left  text-gray-500 ">
          Production Team is striving hard to produce best quality products and
       </p>
       <p className=" text-lg  mb-4 text-left  text-gray-500 ">
       Field Team is delivering at their best to fulfill customer's satisfaction".
       </p>
      </div>

        </div>
      </div>
      <div className="pl-20 w-[50%] bg-red place-content-center ">
      
        </div>
    </div>
   
            </div>
    </div>
  );
};

export default AboutUs;