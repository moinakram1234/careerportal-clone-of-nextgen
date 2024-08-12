// pages/Signup.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import SpinnerIcon from "@/components/SpinnerIcon";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, cnic, phone }), // Send email, cnic, and phone
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
    <div className="flex bg-[#014399] min-h-screen">
    <div className="hidden lg:flex w-[40%] bg-login-image"></div>
    <div className="lg:w-[60%] w-full pt-5">
      <div className="flex gap-5  justify-center">
        <div>
          <div className="flex justify-between items-center">
            <img className="w-20 h-20" src="logo.png" alt="logo" />
           
          </div>
          <div className="flex justify-center">
            {/* <h3 className="text-3xl mt-5 text-gray-500">NextGen Leaders Program</h3> */}
          </div>
        </div>
      </div>
      <main className="w-full  p-2 flex justify-center">
        <div className="h-3/5 border-2 border-gray-200 rounded w-96 p-4">
          <form onSubmit={handleSignup}>
            <div className="flex justify-between">
              <h1 className="text-4xl font-bold text-white font-spartan flex justify-center w-full mb-4">
                Register
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
            <div className="mb-4">
              <label
                htmlFor="cnic"
                className="block text-lg font-spartan font-medium text-white"
              >
                CNIC
              </label>
              <input
                type="text"
                id="cnic"
                className="mt-1 p-2 border-2 border-gray-400 rounded-lg w-full"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-lg font-spartan font-medium text-white"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="mt-1 p-2 border-2 text-lg font-spartan border-gray-400 rounded-lg w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                <div>Register</div>
              ) : (
                <div>
                  <SpinnerIcon />
                </div>
              )}
            </button>
            <div className="mt-3 font-spartan flex lg:text-lg text-sm lg:text-center text-white">
              {`If you already have an account? `}
              <button
                type="button"
                onClick={handleLogin}
                className="text-blue-500 text-sm ml-2 text-lg font-spartan hover:underline"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-2">{/* Additional content */}</div>
        </div>
      </main>
    </div>
    <ToastContainer />
  </div>
  
  );
};

export default Signup;
