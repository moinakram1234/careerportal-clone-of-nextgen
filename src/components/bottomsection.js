import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const BottomSection = () => {
  return (
    <div className="bg-gray-800 h-96 text-white p-8">
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Column 1: Buttons */}
        {/* ... Your existing code for buttons */}

        {/* Column 2: About Us */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-xl font-semibold mb-2">About Us</h2>
          <p className="text-gray-400">
            with a successful business history of over 39 years. Our mission is
            to produce PepsiCo quality beverages, maintain market leadership by
            growing our sales volumes, strengthen our market share, deliver ROI
            to all of its stakeholders and fulfill its responsibilities in the
            community.
          </p>
        </div>

        {/* Column 3: Contact Us */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="text-gray-400">
            <FaEnvelope className="inline-block text-xl mr-2" />
            Email: info@yourcompany.com
            <br />
            <FaPhone className="inline-block text-xl mr-2" />
            Phone: (051) 4490490
            <br />
            <FaMapMarkerAlt className="inline-block text-xl mr-2" />
            Address: CDA Industrial triangle, Kahuta Rd, Islamabad, Islamabad
            Capital Territory
          </p>
        </div>

        {/* Column 4: Social Media */}
        <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
          <h2 className="text-xl font-semibold mb-2">Social Media</h2>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-500"
            >
              <FaFacebook className="text-xl" />
            </a>
            <a
              href="https://www.twitter.com/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-500"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://www.instagram.com/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-500"
            >
              <FaInstagram className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSection;
