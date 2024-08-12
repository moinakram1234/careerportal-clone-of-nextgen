import React, { useState, useEffect } from "react";
import Career from "../career";

const CareerPortal = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Simulate loading completion after 3 seconds
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    
     
        <main>
  <Career/>
        </main>
      
    </>
  );
};

export default CareerPortal;
