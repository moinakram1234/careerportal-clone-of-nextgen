import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import SpinnerIcon from "@/components/SpinnerIcon";
//import particlescong from "@/assets/particles";
//import { Particles } from "@tsparticles/react";
const ChangepassWithOTP = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isSendingOTP, setIsSendingOTP] = useState(false);

  const handleSendOTP = async () => {
    try {
      setIsSendingOTP(true);
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("");
        alert(data.message);
        const encodedEmail = btoa(email);
        router.push(`/changepassword/verifyotp?email=${encodedEmail}`);
      } else {
        setErrorMessage(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("An unexpected error occurred");
    } finally {
      setIsSendingOTP(false);
    }
  };

  return (
    <div className="min-h-screen bg-login-image flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="w-full appearance-none border-b-2 py-2 px-1 border-gray-400 text-gray-950 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 flex justify-center w-32 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSendOTP}
              disabled={isSendingOTP || !email}
            >
              {isSendingOTP ? <SpinnerIcon /> : <div>Send OTP</div>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangepassWithOTP;
