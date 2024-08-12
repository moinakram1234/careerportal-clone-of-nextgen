// components/EmailSentMessage.js

import Custom404 from '@/pages/404';
import React, { useEffect } from 'react';
// import Head from 'next/head';
// import { CheckCircleIcon } from '@heroicons/react/solid'; // Using Heroicons for icons
// import parseJwt from '@/components/parsetoken';
// import { CheckCircledIcon } from '@radix-ui/react-icons';

const EmailSentMessage = () => {
    // useEffect(() => {
    //     const sendEmail = async () => {
    //       try {
    //         // Get token data from localStorage
    //         const tokenData = localStorage.getItem('token');
    //         if (!tokenData) {
    //           throw new Error('Token not found in localStorage');
    //         }
    
    //         // Parse token data to get email
    //         const { email } = parseJwt(tokenData);
    
    //         // Example API endpoint URL (replace with your actual endpoint)
    //         const apiUrl = '/api/send-email';
    
    //         // Example POST request to send email
    //         const response = await fetch(apiUrl, {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //             // Replace 'YOUR_AUTH_TOKEN' with your actual authentication token mechanism
    //             Authorization: `Bearer YOUR_AUTH_TOKEN`,
    //           },
    //           body: JSON.stringify({ email }),
    //         });
    
    //         if (!response.ok) {
    //           throw new Error('Failed to send email');
    //         }
    
    //         console.log('Email sent successfully');
    //       } catch (error) {
    //         console.error('Error sending email:', error.message);
    //       }
    //     };
    
    //     sendEmail();

        
    //   }, []); // Empty dependency array ensures the effect runs only once on mount
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* <Head>
        <title>Email Sent</title>
      </Head>
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg flex items-center space-x-4">
        <CheckCircledIcon className="h-12 w-12 text-green-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Email Sent</h2>
          <p className="text-gray-700">
           Your application has been successfully submitted. Please check your email for further instructions.
          </p>
        </div>
      </div> */}
      <Custom404/>
    </div>
  );
};

export default EmailSentMessage;
