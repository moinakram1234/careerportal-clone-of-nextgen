import React, { useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Button, Card, CardHeader, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

function AirbnbCard({ jobPosts }) {
    const imageUrl = 'https://contact.pepsico.com/files/pepsi/brands/1692797945/new%20pepsi%20logo%20banner%205@2x.PNG';

    // Ref for slider
    const sliderRef = useRef();

    // Slider settings
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true, // Enable vertical slider
        verticalSwiping: true, // Enable vertical swiping
        arrows: false
    };

    // Custom function to handle scroll up
    const handleScrollUp = () => {
        sliderRef.current.slickPrev();
    };

    // Custom function to handle scroll down
    const handleScrollDown = () => {
        sliderRef.current.slickNext();
    };

    // Format created at date
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
        <div className='flex'>
           <div>
           <h1 className='text-center text-5xl top-10 text-black'>Opportunity for Experienced</h1>
            {/* Slider component */}
            <Slider ref={sliderRef} {...settings}>
                {jobPosts.map((jobPost) => (
                    <div key={jobPost.id} className="mx-auto p-5">
                        <div className="justify-center md:flex items-center">
                            <div className="bg-[#FFFFFF] m-2 p-4 md:w-[80%] rounded border hover:border-black transition duration-300 ease-in-out transform hover:scale-105">
                                <Stack spacing="4">
                                    <Card>
                                        <div className="md:flex gap-4 items-center">
                                            <div className="w-full md:w-40 flex justify-center">
                                                <Image
                                                    borderRadius="75px"
                                                    boxSize="100px"
                                                    src="/logo.png"
                                                    alt="Haidri"
                                                />
                                            </div>
                                            <CardHeader className="md:text-left w-72 text-center">
                                                <Heading size="md" fontSize={20}>
                                                    {jobPost.jobTitle}
                                                </Heading>
                                                <Text className="text-blue-400 text-[13px]">
                                                    {jobPost.jobLocation}
                                                </Text>
                                            </CardHeader>
                                            <div className="grid md:grid-cols-4 grid-cols-3 gap-2 md:text-left w-full text-center">
                                                <Text className="text-gray-500">{jobPost.experienceLevel}</Text>
                                                <Text className="text-gray-500">{formatCreatedAt(jobPost.submissionDeadline)}</Text>
                                                <Text className="text-gray-500">{jobPost.department}</Text>
                                                <div className="md:flex justify-center w-full md:visible hidden">
                                                    <Button className="bg-black p-2 w-32 rounded-lg hover:scale-110 hover:bg-green-500 text-white">
                                                        Apply Now
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex justify-center w-full md:hidden visible">
                                                <Button className="bg-black p-2 w-32 rounded-lg mt-10 hover:scale-110 hover:bg-green-500 text-white">
                                                    Apply Now
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </Stack>
                            </div>
                        </div>
                    </div>
                ))}
            
            </Slider>
           </div>
            {/* Buttons for scrolling */}
            <div className="flex flex-col space-y-10 -mt-32 justify-center ">
                <Button className="" onClick={handleScrollUp}>
                    <TriangleUpIcon />
                </Button>
                <Button onClick={handleScrollDown}>
                <TriangleDownIcon /> 
                </Button>
            </div>
        </div>
    );
}

export default AirbnbCard;
