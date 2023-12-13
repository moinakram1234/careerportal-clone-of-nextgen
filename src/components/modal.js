// components/Modal.js

import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div  className="fixed   inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-50 absolute inset-0 "></div>
      <div  className="bg-white p-9 w-2/5 rounded-md z-10">
        {children}
        <button className="bg-blue-500 text-white py-2 px-4 rounded absolute -m-10 ml-96 hover:bg-blue-600" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
