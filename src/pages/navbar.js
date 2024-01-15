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
const Navbar = () => {
  const router = useRouter();
  const darkMode = useSelector((state) => state.darkMode);
  const [nav, setNav] = useState(false);
  const { data: session } = useSession();
  const [userToken, setUserToken] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const links = [
    {
      id: 1,
      link: "home",
      url: "/",
    },
    {
      id: 2,
      link: "about",
      url: "/",
    },
    {
      id: 3,
      link: "career",
      url: "career",
    },
    {
      id: 4,
      link: "blogs",
      url: "/",
    },
    {
      id: 5,
      link: "contact",
      url: "/",
    },
  ];
  const signOut_token = () => {
    setUserToken(null);
    setTokenData(null);
    localStorage.removeItem("token");
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    setUserToken(token);

    setTokenData(parseJwt(token));
  }, []); // Log userToken when it changes

  return (
    <div>
      {(userToken || session) && (
        <div
          className={`flex justify-between z-10 items-center min-w-full h-20 px-4 mt-3 text-gray-500 absolute nav`}
        >
          <div>
            {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
            <div className="flex items-center">
              <div className="bg-white w-10  h-9 lg:w-20 lg:h-20 p-2 rounded-full flex items-center justify-center opacity-95 shadow-2xl">
                <img
                  src="logo.png"
                  alt="logo"
                  className="absolute w-12 lg:w-28  "
                />
              </div>

              <h1 className="text-3xl font-signature ml-2 text-gray-500">
                <a
                  className="link-underline link-underline-black text-[15px] lg:text-3xl font-sans font-semibold text-white"
                  href=""
                  target="_blank"
                  rel="noreferrer"
                >
                  Haidri Beverages
                </a>
              </h1>
            </div>
          </div>

          <ul className="  gap-5 flex text-white ">
            <SwitchButton />
            {session && (
              <div className=" md:flex hidden lg:flex gap-5 text-white">
                <div className="shadow-black z-20">{session.user.name}</div>
                <img
                  className="w-10 h-10 rounded-full"
                  src={session.user.image}
                  alt="profile image"
                />
                <div className="bg-blue-900 text-center items-center p-2 rounded">
                  <button onClick={() => signOut()}>Sign out</button>
                </div>
              </div>
            )}
            {userToken && (
              <div className="hidden lg:flex md:flex gap-5  text-white">
                <div className="shadow-black mt-4 z-20">
                  <GetNameFromEmail email={tokenData.email} />
                </div>
                {/* <img
              className="w-10 rounded-full"
              src={session.user.image}
              alt="profile image"
            /> */}
                <div className="bg-blue-900 text-center  w-20 h-10 items-center p-2 rounded">
                  <button className="text-sm" onClick={() => signOut_token()}>
                    Sign out
                  </button>
                </div>
              </div>
            )}

            {/* <div className="hidden md:flex">
          {links.map(({ id, link, url }) => (
            <li
              key={id}
              className="text-sm font-sans lg:text-lg  nav-links px-4 cursor-pointer capitalize  text-white hover:scale-105 hover:text-white duration-200 link-underline"
            >
              <Link href={url}>{link}</Link>
            </li>
          ))}
        </div> */}
          </ul>

          {!nav && (
            <div
              onClick={() => setNav(!nav)}
              className="cursor-pointer pr-4 z-20 text-white lg:text-gray-500 md:hidden"
            >
              <FaBars size={20} />
            </div>
          )}

          {nav && (
            <ul className=" fixed z-10 flex-col items-center  top-0 left-0 w-full min-h-screen bg-white">
              <li className=" px-1 cursor-pointer capitalize py-2  text-4xl">
                <div className="text-white  text-lg">
                  {session && (
                     <div className="justify-evenly"> <div className="flex flex-col  justify-around">
                   
                       <div
                        onClick={() => setNav(!nav)}
                        className="cursor-pointer pt-4   z-20 ml-80    text-black lg:text-gray-500 md:hidden"
                      >
                        <FaTimes size={25} />
                      </div>
                      <div className="flex pt-16 gap-6">
                        {" "}
                        <img
                          className="w-10 rounded-full"
                          src={session.user.image}
                          alt="profile image"
                        />
                        <div className="shadow-black z-20  text-gray-500">
                          {session.user.name}
                        </div>
                      </div>

                 
                    </div>
                    <div className="bg-blue-900  text-center  p-3 rounded mt-96">
                        <button className="text-sm" onClick={() => signOut()}>
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                  {userToken && (
                    <div className="justify-evenly"> <div className="flex flex-col  justify-around">
                   
                    <div
                     onClick={() => setNav(!nav)}
                     className="cursor-pointer pt-4   z-20 ml-80    text-black lg:text-gray-500 md:hidden"
                   >
                     <FaTimes size={25} />
                   </div>
                   <div className="flex pt-16 gap-6">
                     {" "}
                     <div
                       className="w-10 pl-2 rounded-full z-20 text-gray-600"
                       
                     ><IoPersonCircle size={40}/></div>
                     <div className="shadow-black   text-gray-500">
                       {<GetNameFromEmail email={tokenData.email}/>}
                     </div>
                   </div>

              
                 </div>
                 <div className="bg-blue-900  text-center  p-3 rounded mt-96">
                     <button className="text-sm" onClick={() => signOut()}>
                       Sign out
                     </button>
                   </div>
                 </div>
                  )}
                </div>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
