// ProductPage.js
import React from 'react';
import ImageSlider from './imagesSlider'; // Adjust the path as needed

const ProductPage = () => {
  const images = [
    { src: '/images/product1.jpg' },
    { src: '/images/product2.jpg' },
    { src: '/images/product3.jpg' }
  ];

  return (
    <div>
      <h1>Products</h1>
      <ImageSlider images={images} />
    </div>
  );
};

export default ProductPage;
