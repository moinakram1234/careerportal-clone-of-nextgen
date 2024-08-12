import Head from 'next/head';
import { MdAnnouncement } from 'react-icons/md';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import styles from './mto.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Closed() {
  return (
    <div className="flex flex-col items-center  justify-center min-h-screen bg-[#2F2EA6]">
      <Head>
        <title>Applications are Closed</title>
        <meta name="description" content="The applications are currently closed. Please check back later." />
      </Head>
      <Image
          src="/images/herologo.png"
          alt="PepsiCo Logo"
          width={500}
          height={500}
          className={`${styles.logo} z-20 rounded-full`}
        />
      <main className="flex flex-col items-center -mt-24 justify-center w-full flex-1 text-center">
    
        <MdAnnouncement className="w-10 h-10 text-white " />
        <h1 className="lg:mt-6 text-3xl font-spartan z-20 w-full lg:text-5xl font-bold text-white">
          Applications are Closed
        </h1>
        <p className="mt-4 text-xl font-spartan text-white">
          Thank you for your interest. The application period has ended.
        </p>
        <Link href="/login" className={`bottom-4 border-white mt-10 z-20 font-spartan right-10 text-white text-lg font-bold py-4 px-10 rounded-lg ${styles.buttonBlink}`}>
         <a> Go back to login</a>
        </Link>
        <div className="flex space-x-6 mt-10">
          <Link href="https://www.linkedin.com/company/haidri-beverages-pvt.-ltd.-pepsicola-international-franchise/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-8 h-8 text-white hover:text-gray-400 " />
          </Link>
          {/* <a href="https://www.facebook.com/people/PepsiCo-Franchise-North-Pakistan/61559649879114/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="w-8 h-8 text-[#ffcc00] hover:text-gray-400 " />
          </a> */}
          <Link href="https://www.instagram.com/pepsicofranchise_northpakistan/?igsh=MXNnMG1sN211czZxdg%3D%3D" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-8 h-8 text-[#A855F7] hover:text-gray-400 " />
          </Link>
        </div>
      </main>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          data-aos="fade-up"
          className="absolute bg-[#E7A956] -z-10 rounded-tr-full rounded-bl-full rounded-br-full w-16 h-16 md:w-32 md:h-32 animate-fadeIn"
        ></div>
        <div
          data-aos="fade-up"
          className="absolute lg:flex bg-[#6C59CD] rounded-full w-10 h-10 md:w-20 md:h-20 top-20 left-40 animate-fadeIn"
        ></div>
        <div
          data-aos="fade-up"
          className="absolute bg-[#FEB7B2] rounded-full w-4 h-4 md:w-8 md:h-8 top-40 left-80 animate-fadeIn"
        ></div>
        <div
          data-aos="fade-up"
          className="absolute lg:flex bg-purple-500 rounded-full w-16 h-16 md:w-32 md:h-32 top-60 left-20 animate-fadeIn"
        ></div>
        <div className="absolute -z-20 bg-[#21C1F5] rounded-tr-full rounded-bl-full rounded-tl-full w-16 h-16 md:w-32 md:h-32 bottom-0 right-0 animate-fadeIn"></div>
        <div
          data-aos="fade-down"
          className="absolute -z-20 bg-[#6C59CD] rounded-full w-10 h-10 md:w-20 md:h-20 bottom-20 right-40 animate-fadeIn"
        ></div>
        {/* <div
          data-aos="fade-down"
          className="absolute lg:flex bg-purple-500 rounded-full w-16 h-16 md:w-32 md:h-32 bottom-60 right-20 animate-fadeIn"
        ></div> */}
      </div>
    </div>
  );
}
