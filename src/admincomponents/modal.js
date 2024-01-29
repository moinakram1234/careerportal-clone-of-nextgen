// components/Modal.js

import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed  inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-50 absolute inset-0 "></div>
      <div className="bg-white p-9  w-[50%] h-[70%] rounded-md z-10">
      <button
          className="absolute bg-[#FFC83D] text-white py-2 px-4 rounded   ml-[40%] mt-[%]  hover:bg-[#e1d7bf]"
          onClick={onClose}
        >
          Close
        </button>
        {children}
    
      </div>
    </div>
  );
};

export default Modal;
