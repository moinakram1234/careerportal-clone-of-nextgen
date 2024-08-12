import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./mto.module.css";
import { gsap } from "gsap";

const OverlaySection = () => {
  const secondDivRef = useRef(null);
  const textRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [colorValue, setColorValue] = useState("white"); // Start with white
  const [lastScrollTop, setLastScrollTop] = useState(0);
 
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    let currentHeight = 0;
    if (secondDivRef.current) {
     currentHeight = secondDivRef.current.offsetHeight;
      console.log(currentHeight); // Now it's safe to access the property
    }
    const isMobile = window.innerWidth <= 768;

    const scrollDownThreshold = isMobile ? 5000 : 4850;
    const scrollUpThreshold = isMobile ? 5145 : 4850;

    if (
      scrollTop > lastScrollTop &&
      currentHeight < 50 &&
      scrollTop > scrollDownThreshold
    ) {
      // Scrolling down
      setHeight(100);
      setColorValue("white");
    } else if (
      scrollTop < lastScrollTop &&
      currentHeight > 0 &&
      scrollTop < scrollUpThreshold
    ) {
      // Scrolling up
      setHeight(0);
      setColorValue("black");
    }

    setLastScrollTop(scrollTop);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  useEffect(() => {
    AOS.refresh();

    // Use GSAP to animate height change
    gsap.to(secondDivRef.current, {
      height: `${height}vh`,
      duration: 3, // Animation duration in seconds
      ease: "power3.inOut", // Easing function
    });

    // Use GSAP to animate text color change
    gsap.to(textRef.current, {
      color: colorValue,
      duration: 3, // Animation duration in seconds
      ease: "power3.inOut", // Easing function
    });
  }, [height, colorValue]);

  return (
    <div className={styles.container}>
      <div className={styles.firstDiv}></div>
      <div className={styles.secondDiv} ref={secondDivRef}>
        <div className="h-screen" ref={textRef} data-aos="fade-in">
          <div className="flex flex-col items-center justify-center h-screen">
            <div
              className="font-spartan text-3xl lg:text-8xl text-center"
              data-aos="fade-up"
            >
          
              What are you waiting for?
            </div>
            <div
              className="text-sm lg:text-3xl text-center mt-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Apply now and start your journey to becoming a future
            </div>
            <div
              className="text-sm lg:text-2xl text-center mt-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              leader!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlaySection;