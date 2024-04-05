import { Badge, Box, Image } from '@chakra-ui/react';
import React, { useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
function AirbnbCard({ jobPosts }) {
    const imageUrl = 'https://contact.pepsico.com/files/pepsi/brands/1692797945/new%20pepsi%20logo%20banner%205@2x.PNG';
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };const sliderRef = useRef();
      const formatCreatedAt = (createdAt) => {
        const date = new Date(createdAt);
        const formattedDate = date.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        return formattedDate;
      };
    return (
        <div> <h1 className='text-center text-5xl top-10 text-white' >opportunity for Graduates</h1>
        <Slider ref={sliderRef} {...settings}>


            {jobPosts.map((jobPost) => (
              
                    <div key={jobPost.id} className=" mx-auto  lg:p-32 sm:p-24 ">
                    
            <div className="relative rounded-lg block md:flex items-center bg-gray-100 shadow-xl" style={{ minHeight: "19rem" }}>
                <div className="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg" style={{ minHeight: "19rem" }}>
                    <img className="absolute inset-0 w-full h-full object-cover object-center" src={imageUrl} alt="" />
                    <div className="absolute inset-0 w-full h-full bg-indigo-900 opacity-75"></div>
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white">
                        <h1 className='text-4xl'>
                            <h1 >
                                {jobPost.jobTitle.length > 20 ? jobPost.jobTitle.slice(0, 20) + '...' : jobPost.jobTitle}
                            </h1>
                        </h1>
                    </div>
                </div>
                <div className="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
                    <div className="p-12 md:pr-24 md:pl-16 md:py-12">
                        <div className="flex justify-between gap-40">
                            
                        <p className="text-gray-600"><span className="text-gray-900">Deadline:</span> {formatCreatedAt(jobPost.submissionDeadline)}</p>
                            <p className="text-gray-600"><span className="text-gray-900">Location:</span> {jobPost.jobLocation}</p>
                           
                        </div>
                        <div className="flex justify-between mt-2 gap-40">
                        <p className="text-gray-600"><span className="text-gray-900">Type:</span> {jobPost.jobType}</p>
                            <p className="text-gray-600"><span className="text-gray-900">Posted:</span> {formatCreatedAt(jobPost.createdAt)}</p>
                        </div>
                        <p className="mt-2 text-gray-600"><span className="text-gray-900">Experience Level:</span> {jobPost.experienceLevel}</p>
                        <a className="flex items-baseline mt-3 text-indigo-600 hover:text-indigo-900 focus:text-indigo-900" href="">
                            <span>Learn more about this opportunity</span>
                            <span className="text-xs ml-1">&#x279c;</span>
                        </a>
                    </div>
                    <svg className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-gray-100 -ml-12" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>
                </div>
                <button
                    className="absolute top-0 mt-32 left-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -ml-6 focus:outline-none focus:shadow-outline"
                    onClick={() => sliderRef.current.slickPrev()}
                >
                    <span className="block" style={{ transform: "scale(-1)" }}>&#x279c;</span>
                </button>
                <button
                    className="absolute top-0 mt-32 right-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -mr-6 focus:outline-none focus:shadow-outline"
                    onClick={() => sliderRef.current.slickNext()}
                >
                    <span className="block" style={{ transform: "scale(1)" }}>&#x279c;</span>
                </button>
            </div>

        </div> 
            
            ))}
     
        </Slider> </div>
    );
}

export default AirbnbCard;
