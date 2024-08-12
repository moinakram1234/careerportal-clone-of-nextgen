// pages/ideal-candidate.js

import Head from 'next/head';
import { FaArrowRight, FaBrain, FaCheckCircle } from 'react-icons/fa';
import { FaRegCircle } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
export default function IdealCandidate() {
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
<div className="flex items-center">
    <hr className="h-[1px] flex-grow bg-gradient-to-r from-gray-300 to-gray-500" />
 <FaRegCircle/>
    <hr className="h-[1px] flex-grow bg-gradient-to-r from-gray-300 to-gray-500" />
  </div>
           <div className=" bg-gray-100 flex items-center justify-center">
    
    <Head>
      <title>Our Ideal Candidate</title>
    </Head>
    
    <div className="bg-white min-h-screen rounded-lg h-full p-8 flex flex-col md:flex-row items-center space-x-6">
     
      <div className="md:w-1/2 p-6" data-aos="fade-right">
        <div className="flex items-center mb-6">
          <FaArrowRight className="text-4xl text-gray-800" />
          <h1 className="text-3xl font-bold text-gray-800 ml-4">Our Ideal Candidate</h1>
        </div>
        <p className="text-gray-700 leading-relaxed tracking-wide">
          For us it is important that you enjoy being challenged. It is important to be able to analyze problems, absorb information and come with out of the box ideas. You should be self driven and should always strive to achieve more. You should have the confidence and resilience to get things done.
        </p>
        <p className="text-gray-700 leading-relaxed tracking-wide mt-4">
          We’ll support and guide you to develop your potential and team you up with some of our most accomplished problem-solvers & dynamic innovators, helping us to achieve excellence in everything we do.
        </p>
      </div>
      <div className="md:w-1/2 p-6 flex flex-col items-center justify-center" data-aos="fade-left">
        <FaBrain size={200} className="text-6xl text-gray-800 mb-4" />
        <div className="text-center text-gray-700 mb-4">
          We’re looking for people with the intellectual, analytical and creative ability to learn quickly, identify issues and propose feasible business solutions.
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <FaCheckCircle className="text-xl text-green-600" />
            <span className="ml-2">Competent</span>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="text-xl text-green-600" />
            <span className="ml-2">Agile</span>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="text-xl text-green-600" />
            <span className="ml-2">Passionate</span>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="text-xl text-green-600" />
            <span className="ml-2">Ethical</span>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
 
  );
}
