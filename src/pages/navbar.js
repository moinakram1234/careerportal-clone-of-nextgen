import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import SwitchButton from "@/components/darkmode";
import { useSelector } from "react-redux";
import { useSession, signOut } from "next-auth/react";
import parseJwt from "@/components/parsetoken";
import GetNameFromEmail from "@/components/getname_from_email";
import { useRouter } from "next/router";
import { PiCarProfile, PiPerson } from "react-icons/pi";
import { AiFillProfile } from "react-icons/ai";
import { IoPersonCircle } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
const Navbar = () => {
  const router = useRouter();
  const darkMode = useSelector((state) => state.darkMode);
  const [nav, setNav] = useState(false);
  const { data: session } = useSession();
  const [userToken, setUserToken] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [scrolled, isScrolled] = useState(false);

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
    <div>
    <div
      className={`w-full ${
        scrolled ? (darkMode ? 'bg-[#292929] text-white' : 'bg-white ') : 'bg-white '
      } px-6 h-20 text-[#24120e] font-serif flex items-center fixed top-0 left-0 z-50`}
    >
 

        <div className="px-1 h-full flex items-center  ">
          <img src="/logo.png" alt="logo" className="h-12 w-12" />
          <p className="font-semibold tracking-widest text-lg  ml-5 ">
            Haidri Beverages
          </p>
        </div>
        <div className="justify-between flex w-[75%]  ml-24 ">
          <div className="px-2 h-full hidden items-center  lg:flex">
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
              href={"/frontend/displayJobs"}
              className="px-3 mx-4 text-base font-medium transition-all translate-y-2 duration-700 hover:translate-y-5 "
            >
              Contact
            </Link>
          </div>
          <div className="px-2 h-full hidden   items-center justify-center lg:flex ">
            <div className="ml-5"><SwitchButton/></div>
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

                <p className={`text-lg px-4 font-semibold ${
        scrolled ? (darkMode ? 'bg-[#292929] text-white' : 'bg-white ') : 'bg-white '
      } text-[#24120e]`}>
                  {session?.user?.name}
                </p>
                <BiLogOut
                  onClick={() => signOut()}
                  className={`cursor-pointer text-3xl ${
                    scrolled ? (darkMode ? 'bg-[#292929] text-white' : 'bg-white ') : 'bg-white '
                  } text-[#24120e] hover:text-red-500 transition-all duration-700`}
                />
              </>
            ) }
            {tokenData&&(
              <>
                <div className="w-10 mr-5 rounded-full z-20text-[#24120e]">
                  <IoPersonCircle size={40} />
                </div>
                <div className={`shadow-black ${
        scrolled ? (darkMode ? 'bg-[#292929] text-white' : 'bg-white ') : 'bg-white '
      } text-[#24120e]`}>
                  {<GetNameFromEmail email={tokenData?.email} />}
                </div>
                <BiLogOut
                  onClick={() => signOut_token()}
                  className={`cursor-pointer ml-4 text-3xl ${
                    scrolled ? (darkMode ? 'bg-[#292929] text-white' : 'bg-white ') : 'bg-white '
                  } text-[#24120e] hover:text-red-500 transition-all duration-700`}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
