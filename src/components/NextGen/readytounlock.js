import React from 'react'
import styles from "./mto.module.css";
const Readytounlock = () => {
  return (
    <div>  <div>
    <div className="relative h-full">
      {/* <div
        className="absolute bottom-0 z-20 right-0"
        style={{ transform: "translate(20%, 60%)" }}
      >
        <div className="w-24 h-24 md:w-52 hidden md:flex md:h-52 bg-[#E7A956] rounded-tl-full rounded-tr-full rounded-br-full"></div>
      </div> */}
    </div>
    <div className="h-5 w-full bg-[#DCB96E]"></div>
    <div className="flex flex-col md:flex-row h-screen  ">
      <div className="flex flex-col pt-20   md:w-[70%] w-full">
        <div className="md:flex items-center "></div>
        <div className="bg-gray-100 w-[95%] lg:ml-9 ml-3 rounded-lg p-8">
          <div className="">
            <h3 className="text-3xl   font-spartan md:text-7xl font-bold text-gray-900">
              Ready to unlock your potential?
            </h3>
          </div>
        </div>

      
        <div className=" flex justify-center mt-10">
 <p className={`text-gray-700 ${styles.textready} font-spartan text-center w-[80%] h-full lg:text-[24px] mt-4 `} >
          Unleash your inner strength and become the leader you&apos;re meant to
          be. Join us to learn, grow, and make a real impact. You&apos;ll gain
          new skills, build connections, and turn your dreams into
          achievable goals.
        </p>
 </div>
 
      </div>
      
      <div className="w-full hidden md:flex justify-center items-center bg-[#2F2EA6] md:w-1/2 relative">
        <img
          src="/images/readytounlock.png"
          alt="NextGen Logo"
          className="w-full object-cover"
        />
      </div>
    </div>
  </div></div>
  )
}

export default Readytounlock