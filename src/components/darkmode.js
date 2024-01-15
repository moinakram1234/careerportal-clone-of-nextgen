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
        <input
          id="darkModeSwitch"
          type="checkbox"
          onChange={handleToggleDarkMode}
          checked={darkMode}
          className="hidden"
        />
        <div className={`w-14 h-7  rounded-full p-1 transition ${darkMode ? 'bg-white' : 'bg-black'}`}>
          <div className={`bg-white w-7 h-5 rounded-full  shadow-md transform ${darkMode ? 'translate-x-6' : ''} transition`}>
          {darkMode? <div className='ml-1 text-black ' ><MdLightMode/></div>:<div className='ml-1 text-black' ><MdDarkMode/></div>}
          </div>
        </div>
      </label>
    </div>
  );
};

export default SwitchButton;
