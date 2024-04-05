// pages/ContactUs.js
import React from 'react';
import Head from 'next/head';
import { BaseLayout, BottomSection } from '@/components/export_libraries/exportlibrary';

const ContactUs = () => {
  return (
    <BaseLayout>
    <div className="container mx-auto pt-40 h-screen contactus_bg">
      <Head>
        <title>Contact Us</title>
      </Head>
   <div className='flex justify-center items-center'>   <h1 className="text-3xl font-bold mb-5">Contact Us</h1></div>
      <div className="max-w-lg mx-auto">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Your Message"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
 
    <BottomSection/>
    </BaseLayout>
  );
};

export default ContactUs;
