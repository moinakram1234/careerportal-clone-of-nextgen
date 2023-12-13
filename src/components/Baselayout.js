import Navbar from "./navbar";

const BaseLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen gap-2 bg-white">
      <Navbar />
      <main className="w-full mt-24 ">
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;
