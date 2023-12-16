import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [nav, setNav] = useState(false);

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

  return (
    <div className="flex justify-between items-center min-w-full h-20 px-4 text-white border absolute nav">
      <div>
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
       <div className="flex items-center">
        <img src="logo.png" alt="logo" className="w-10 lg:w-20 "/>
       <h1 className="text-3xl font-signature ml-2 text-gray-500">
          <a
            className="link-underline link-underline-black text-sm lg:text-2xl"
            href=""
            target="_blank"
            rel="noreferrer"
          >
            Haidri Beverages
          </a>
        </h1>
       </div>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link,url }) => (
          <li
            key={id}
            className="text-sm lg:text-lg nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={url}>{link}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-20 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={20} />}
      </div>

      {nav && (
        <ul className="flex z-10 flex-col justify-center items-center absolute top-0 left-0 w-full min-h-screen bg-gradient-to-b from-white to-blue-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link className="text-white" onClick={() => setNav(!nav)} href={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;