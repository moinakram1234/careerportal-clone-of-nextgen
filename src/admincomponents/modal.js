// components/Modal.js

import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div  className="fixed  inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-50 absolute inset-0 "></div>
      <div  className="bg-white p-9  rounded-md z-10">
        {children}
        <button className="mt-64 pr-20 bg-blue-500 text-white absolute   px-4 rounded-md hover:bg-blue-600" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
