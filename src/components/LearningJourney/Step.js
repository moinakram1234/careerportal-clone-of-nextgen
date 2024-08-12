import React from 'react';

const Step = ({ step, icon, active }) => {
  return (
    <div
      className={`flex items-center mb-4 ${
        active ? 'bg-gray-200 p-4 rounded' : 'bg-white p-4 rounded'
      }`}
    >
      <div className="w-12 h-12 flex justify-center items-center bg-orange-500 rounded-full text-white">
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-bold">{step}</h3>
      </div>
    </div>
  );
};

export default Step;