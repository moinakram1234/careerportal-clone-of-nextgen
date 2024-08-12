import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Appform from "@/components/NextGen/app_form";
import parseJwt from '@/components/parsetoken';
import { isTokenExpired } from '@/components/tokenUtils';
import Closed from '../applicationclosed';
const Index = () => {
  const [tokenData, setTokenData] = useState(null);
  const router = useRouter();

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    const tokenData = parseJwt(token);
    setTokenData(tokenData);
     
    // Check if the token has expired
    if (isTokenExpired(tokenData)) {
      // If the token has expired, redirect to the login page
      router.push('/login'); // Adjust the route as per your application setup
      return; // Exit the useEffect callback to prevent further execution
    }

    // Check if all required fields are present in the tokenData
    if (!tokenData.email || !tokenData.phone || !tokenData.CNIC) {
      // If any of the required fields are missing, redirect to the login page
      router.push('/login'); // Adjust the route as per your application setup
    }
  } else {
    // If no token is found, redirect to the login page
    router.push('/login'); // Adjust the route as per your application setup
  }
}, []);

  if (!tokenData) {
    // Handle the case where tokenData is not available, e.g., show a loading spinner or a message
    return <div>Loading...</div>;
  }

  return (
  //   <div>
  //   <Closed/>
  //  </div>
    <div className='bg-[#2F2EA6]'>
      
      <Appform email={tokenData.email} />
    </div>
  );
};

export default Index;
