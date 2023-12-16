
import Navbar from './navbar';

const BaseLayout = ({ children }) => {
  // State to manage dark/light mode


  // Effect to set the mode based on local storage or other preferences

  // Effect to update local storage when the mode changes

  return (
    <div className={`flex overflow-x-hidden  min-h-screen bg-white`}>
      <Navbar />
      <main className="mt-24 w-full">
        {children}
      </main>
    
    </div>
  );
};

export default BaseLayout;
