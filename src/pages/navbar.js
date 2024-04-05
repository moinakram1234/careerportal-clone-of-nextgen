import Link from "next/link";
import React, { useState, useEffect } from "react";
import SwitchButton from "@/components/darkmode";
import { useSelector } from "react-redux";
import { useSession, signOut } from "next-auth/react";
import parseJwt from "@/components/parsetoken";
import GetNameFromEmail from "@/components/getname_from_email";
import { useRouter } from "next/router";
import { IoPersonCircle } from "react-icons/io5";
import { BiLogOut, BiMenu } from "react-icons/bi";
import {  useMediaQuery } from '@chakra-ui/react'

const Navbar = () => {
  const router = useRouter();
  const darkMode = useSelector((state) => state.darkMode);
  const { data: session } = useSession();
  const [userToken, setUserToken] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [scrolled, isScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const [isLargerThan800] = useMediaQuery('(min-width: 1080px)')
  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token);
    setTokenData(parseJwt(token));
  }, []); // Log userToken when it changes

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      isScrolled(true);
    } else {
      isScrolled(false);
    }
  };

  const signOut_token = () => {
    setUserToken(null);
    setTokenData(null);
    localStorage.removeItem("token");

    // Check if the session object exists before attempting to access its properties
    router.push("/");
  };

  return (
    <div className="">
      <div
        className={`w-full ${
          scrolled
            ? darkMode
              ? "bg-[#292929] text-white"
              : "bg-white "
            : "bg-white "
        } px-3 h-20 text-[#24120e]  flex items-center fixed top-0 left-0 z-50 border ${isLargerThan800?"":"justify-between"}`}
      >
        <div className="px-1 h-full flex items-center  ">
          <img src="/logo.png" alt="logo" className="h-12 w-12" />
          <p className="font-extrabold tracking-widest text-lg  ml-5 ">
            Haidri Beverages
          </p>
        </div>
        <div className={`justify-between flex w-[75%]  ml-24  ${isLargerThan800?"visible":"hidden"} `}>
          <div className={`px-2 h-full   items-center  lg:flex`}>
            <Link
              href={"/career"}
              className="px-3 mx-4 text-base font-medium transition-all translate-y-2 duration-700 hover:translate-y-5 "
            >
              Home
            </Link>

            <Link
              href={"/jobs"}
              className="px-3 mx-4 text-base font-medium transition-all translate-y-2 duration-700 hover:translate-y-5 "
            >
              View Jobs
            </Link>

            <Link
              href={"/contactus"}
              className="px-3 mx-4 text-base font-medium transition-all translate-y-2 duration-700 hover:translate-y-5 "
            >
              Contact
            </Link>
          </div>
          <div className={`px-2 h-full   items-center justify-center lg:flex `}>
            <div className="ml-5">
              <SwitchButton />
            </div>
            {session && (
              <>
                {session?.user?.image ? (
                  <img
                    className="rounded-full mr-5"
                    src={session?.user?.image}
                    alt="user"
                    width={40}
                  />
                ) : (
                  <IoPersonCircle size={40} />
                )}

                <p
                  className={`text-lg px-4 font-semibold ${
                    scrolled
                      ? darkMode
                        ? "bg-[#292929] text-white"
                        : "bg-white "
                      : "bg-white "
                  } text-[#24120e]`}
                >
                  {session?.user?.name}
                </p>
                <BiLogOut
                  onClick={() => signOut()}
                  className={`cursor-pointer text-3xl ${
                    scrolled
                      ? darkMode
                        ? "bg-[#292929] text-white"
                        : "bg-white "
                      : "bg-white "
                  } text-[#24120e] hover:text-red-500 transition-all duration-700`}
                />
              </>
            )}
            {tokenData && (
              <>
                <div className="w-10 mr-5 rounded-full z-20text-[#24120e]">
                  <IoPersonCircle size={40} />
                </div>
                <div
                  className={`shadow-black ${
                    scrolled
                      ? darkMode
                        ? "bg-[#292929] text-white"
                        : "bg-white "
                      : "bg-white "
                  } text-[#24120e]`}
                >
                  {<GetNameFromEmail email={tokenData?.email} />}
                </div>
                <BiLogOut
                  onClick={() => signOut_token()}
                  className={`cursor-pointer ml-4 text-3xl ${
                    scrolled
                      ? darkMode
                        ? "bg-[#292929] text-white"
                        : "bg-white "
                      : "bg-white "
                  } text-[#24120e] hover:text-red-500 transition-all duration-700`}
                />
              </>
            )}
          </div>
        </div>
        <div>
      
      <button className={`${isLargerThan800?"hidden":"visible"} `} onClick={openDrawer}>
        <BiMenu className="text-3xl" />
      </button>

      {isOpen && (
        <div className={`fixed inset-0 bg-gray-500 opacity-75 `} onClick={closeDrawer}></div>
      )}

      <div className={`fixed h-[90%] inset-y-0 right-0 w-64 bg-white shadow-xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between bg-gray-200  py-2">
          <h2 className="text-lg w-full p-2  font-semibold">   <div className={` justify-between    flex `}>
            <div className="  ">
              <SwitchButton />
            </div>
            {session && (
              <>
              

                <p
                  className={`text-[15px]  px-4 font-semibold  text-[#24120e]`}
                >
                  {session?.user?.name}
                </p>
                <button onClick={closeDrawer} className="text-gray-600 focus:outline-none">&times;</button>
              </>
            )}
            {tokenData && (
              <>
                
                <div
                  className={`shadow-black ${
                    scrolled
                      ? darkMode
                        ? " text-black"
                        : ""
                      : " "
                  } text-[#24120e]`}
                >
                  {<GetNameFromEmail email={tokenData?.email} />}
                </div>
                <button onClick={closeDrawer} className="text-gray-600 focus:outline-none">&times;</button>
              </>
            )}
          </div></h2>
         
        </div>
       <div className=" flex flex-col  h-full  ">
       <div className="p-4 flex flex-col space-y-10">
        <Link
              href={"/career"}
              className="px-3 mx-4 text-black  text-base font-medium transition-all translate-y-2 duration-700 hover:translate-y-5 "
            >
              Home
            </Link>

            <Link
              href={"/jobs"}
              className="px-3 mx-4 text-black  font-medium transition-all translate-y-2 duration-700 hover:translate-y-5 "
            >
              View Jobs
            </Link>

            <Link
              href={"/contactus"}
              className="px-3 mx-4 text-black  font-medium transition-all translate-y-2 duration-700 hover:translate-y-5 "
            >
              Contact
            </Link>
            
        </div>
        <div className={`px-2 h-full bg-white p-4 flex items-end justify-center lg:flex`}>
        
            {session && (
              <>
              

                <p
                  className={`text-lg px-4 font-semibold  text-[#24120e]`}
                >
              
                </p>

               <div  onClick={() => signOut()} className="flex bg-black p-2 rounded-lg text-white gap-3 justify-center items-center mr-3">
               
                
                <BiLogOut
                  className={`cursor-pointer text-2xl  hover:text-red-500 transition-all duration-700`}
                /> <h2 className="text-xl " >Logout</h2>
               </div>
              </>
            )}
            {tokenData && (
              <>
                
                <div
                  className={`shadow-black  text-[#24120e]`}
                >
               
                </div>
              <div  onClick={() => signOut_token()} className="flex bg-black p-2 rounded-lg text-white gap-3 justify-center items-center mr-3">
             
                
                <BiLogOut
                  className={`cursor-pointer text-2xl    hover:text-red-500 transition-all duration-700`}
                />   <h2 className="text-xl " >Logout</h2>
              </div>
              </>
            )}
          </div>
       </div>
    
      </div>
    </div>
      </div>
     
    </div>
  );
};

export default Navbar;
