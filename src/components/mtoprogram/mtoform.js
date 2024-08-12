import React, { useState } from 'react';
import Head from 'next/head';
import { FaRegCircle } from 'react-icons/fa';

function MTOForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    education: '',
    cv: null,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({
      ...formData,
      [id]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_APP_URL_mto, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="flex items-center mt-10">
        <hr className="h-[1px] flex-grow bg-gradient-to-r from-gray-300 to-gray-500" />
        <FaRegCircle />
        <hr className="h-[1px] flex-grow bg-gradient-to-r from-gray-300 to-gray-500" />
      </div>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <Head>
          <title>MTO Form</title>
        </Head>
        <h1 className="text-3xl font-bold mb-4">Apply Now</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="phone"
                type="tel"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="address"
                type="text"
                placeholder="123 Main St"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="education"
              >
                Education
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="education"
                placeholder="Bachelor's degree in Transportation Management"
                value={formData.education}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="cv"
              >
                CV
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="cv"
                type="file"
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className="bg-[#002060] hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default MTOForm;
