import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import SpinnerIcon from "@/components/SpinnerIcon";
import Confetti from "@/assets/confetti";

//import { Particles } from "@tsparticles/react";
const SignupWithOTP = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to store each digit
  const [errorMessage, setErrorMessage] = useState("");
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const formRef = useRef(null);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const otpInputsRef = useRef(
    Array.from({ length: 6 }, () => React.createRef())
  );

  useEffect(() => {
    // Extract encoded email from query parameters
    const { email: encodedEmail } = router.query;
    if (!encodedEmail) router.push("/signup");
    if (encodedEmail) {
      // Decode the email using atob
      const decodedEmail = atob(decodeURIComponent(encodedEmail.toString()));
      setEmail(decodedEmail);
    }
  }, [router.query]);

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

  const handleVerifyOTP = async () => {
    try {
      setIsVerifyingOTP(true);
      const enteredOtp = otp.join(""); // Combine individual digits into a string
      const response = await fetch("/api/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("OTP verified successfully🎉🎊🥳");
        // Continue with the user signup logic
        // You can redirect the user to the signup page or perform other actions
       
             // Activate confetti
             setIsConfettiActive(true);
             setTimeout(() => {
               setIsConfettiActive(false);
               setTimeout(() => {
                router.push("/login");
                }, 1000);
             }, 10000); // Deactivate confetti after 10 seconds
     
       
      } else {
        setErrorMessage(data.error || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage("An unexpected error occurred");
    } finally {
      setIsVerifyingOTP(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value === "" && index > 0) {
      // If the entered digit is empty and the current index is greater than 0, move to the previous input field
      otpInputsRef.current[index - 1].current.focus();
    } else if (value !== "" && index < otp.length - 1) {
      // If the entered digit is not empty and the current index is less than the last index, move to the next input field
      otpInputsRef.current[index + 1].current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-login-image flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <form ref={formRef}>
          <p className="mb-4 text-gray-700 text-sm">
            Email: <strong>{email}</strong>
          </p>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="otp"
            >
              OTP:
            </label>
            <div className="flex space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpInputsRef.current[index]}
                  className="flex-1 w-8 appearance-none border-b-2  py-2 px-1 border-gray-400 text-center text-gray-950 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>
          {(errorMessage && !isConfettiActive)?<p className="text-red-500 mb-4">{errorMessage}</p>:<p className="text-green-500 mb-4">{errorMessage}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 flex justify-center w-32 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSendOTP}
              disabled={isSendingOTP}
            >
              {isSendingOTP ? <SpinnerIcon /> : <div>Send OTP</div>}
            </button>
            <button
              className="bg-green-500 w-32 flex justify-center text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleVerifyOTP}
              disabled={isVerifyingOTP}
            >
              {isVerifyingOTP ? <SpinnerIcon /> : <div>Verify OTP</div>}
            </button>
          </div>
        </form>
        {isConfettiActive && <Confetti />}
      </div>
    </div>
  );
};

export default SignupWithOTP;
