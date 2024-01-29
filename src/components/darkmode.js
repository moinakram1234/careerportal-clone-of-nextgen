// SwitchButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '@/Redux_Store/darkModeSlice';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
const SwitchButton = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  
  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="darkModeSwitch" className="cursor-pointer">
          <div onClick={()=>handleToggleDarkMode()} className={` shadow  mr-4 rounded-full `}>
          {darkMode? <div className='ml-1 text-yellow-300 ' ><MdLightMode size={30} /></div>:<div className='ml-1 text-black' ><MdDarkMode size={30} /></div>}
          </div>
      
      </label>
    </div>
  );
};

export default SwitchButton;
