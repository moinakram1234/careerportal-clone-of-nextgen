// pages/Signup.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import SpinnerIcon from "@/components/SpinnerIcon";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

// import Closed from "./nextgen-program/applicationclosed";

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send email, cnic, and phone
      });

      const data = await response.json();
      if (response.status === 409) {
      toast(data.message)
      }
      if (response.ok) {
        router.push(`/sendpassword`);
        setEmail("");
        setCnic("");
        setPhone("");
      } else {
        // Handle error case
        // setErrorMessage(data.error || "An error occurred during signup");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    // Add logic to navigate to the login page
    router.push("/login");
  };

  return (
    <div className="grid-col-2 flex bg-[#014399]">
      <div className="bg-login-image lg:flex hidden w-[40%]"></div>
      <div className="lg:w-[60%] w-[100%] pt-5">
        <div className="flex gap-5 mt-5 justify-center">
         <div>
         <div className=" flex justify-between items-center">
      <img className="w-20 h-20" src="logo.png" alt="logo" />
    
      </div>
        <div className=" flex justify-center ">
        {/* <h3 className="text-3xl mt-5 text-gray-500">NextGen Leaders Program</h3> */}
        </div>
         </div>
        </div>
        <main className="w-full  mt-10 flex justify-center">
          <div className="h-3/5 border-2 border-gray-200  rounded w-96 p-4">
            <form onSubmit={handleSignup}>
              <div className="flex justify-between">
                <h1 className="text-4xl  font-bold text-white font-spartan flex justify-center w-full mb-4">
                Reset Password
                </h1>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-spartan font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 border-2 border-gray-400 rounded-lg w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            
            
              {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white flex justify-center p-2 rounded-lg hover:bg-blue-600 w-full"
                disabled={isSubmitting}
              >
                {!isSubmitting ? (
                  <div>Reset password</div>
                ) : (
                  <div>
                    <SpinnerIcon />
                  </div>
                )}
              </button>
              <div className="mt-3 font-spartan text-lg ml-10 text-white">
                {`If you already have an account? `}
                <button
                  type="button"
                  onClick={handleLogin}
                  className="text-blue-500 ml-2 text-lg font-spartan hover:underline"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-center mt-2">{/* Additional content */}</div>
          </div>
        </main>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Signup;