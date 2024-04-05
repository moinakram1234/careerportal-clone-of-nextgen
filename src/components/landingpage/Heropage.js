import React from 'react';
import ImageSlider from './imagesSlider';
const HeroSection = () => {
  const images = ["/images/herosection.jpg", "https://packagingsouthasia.com/wp-content/uploads/2022/11/unnamed-1-1-scaled.jpg", "https://i2.wp.com/digitalspartans.pk/wp-content/uploads/2019/05/TMB-Haidri-Agreement.jpg?fit=1024%2C608&ssl=1"];

  return (
    <div>
      <h1>Hero Section</h1>
      <ImageSlider imageUrls={images} />
    </div>
  );
};

export default HeroSection;
