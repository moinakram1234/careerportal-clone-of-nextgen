import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="relative bg-white  p-4 sm:p-6 md:p-8 lg:p-10 w-full sm:w-11/12 md:w-4/5 lg:w-3/5 xl:w-2/5 rounded-md z-10">
        {children}
        <button
          className="absolute bg-blue-500 text-white py-2 px-4 rounded ml-2 sm:ml-4 -mt-2 sm:-mt-4 right-4 sm:right-6 lg:mt-4 bottom-6 sm:bottom-8 hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
