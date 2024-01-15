import React, { useState, useEffect } from 'react';
import imageArray from '@/components/images';

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Change the current index to the next image in the array
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
    }, 5000); // Change image every 2 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []); // Run effect only once on component mount

  return (
    <div>
      <img
         style={{
            height: '700px',
     
          }}
        className="block w-full object-cover object-center rounded bg-no-repeat filter brightness-75 blur-sm"
        src={imageArray[currentIndex].src}
        alt={imageArray[currentIndex].alt}
     
      />
    </div>
  );
};

export default ImageGallery;
