import React, { useState, useRef } from 'react';

const videoSources = [ "/images/pepsivideo.mp4"];

const ImageGallery = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef();

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        onEnded={handleVideoEnd}
        style={{
          height: '700px',
        }}
        className="block w-full object-cover object-center rounded bg-no-repeat "
        src={videoSources[currentVideoIndex]}
        type="video/mp4"
      />
    </div>
  );
};

const PepsiVideo = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef();

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
      loop
        onEnded={handleVideoEnd}
        style={{
      
        }}
        className="block w-full object-cover object-center rounded bg-no-repeat "
        src={videoSources[currentVideoIndex]}
        type="video/mp4"
      />
    </div>
  );
};

export { PepsiVideo, ImageGallery };

