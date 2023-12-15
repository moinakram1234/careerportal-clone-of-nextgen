import Navbar from "./navbar";

const BaseLayout = ({ children }) => {
  return (
    <div className="flex overflow-x-hidden   bg-white">
      <Navbar />
      <main className=" mt-24 ">
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
