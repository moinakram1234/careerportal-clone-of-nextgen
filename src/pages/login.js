import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import parseJwt from "@/components/parsetoken";
import SpinnerIcon from "@/components/SpinnerIcon";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();
  const [islogging, setislogging] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setislogging(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, userPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        setUserToken(token);
        setEmail("");
        setUserPassword("");

        localStorage.setItem("token", token);

        const tokenData = parseJwt(token);

        // Check if the user has already submitted data
        
        const emailCheckResponse = await fetch(`/api/nextgensubmission?email=${tokenData.email}`, {
          method: 'GET',
        });

        if (emailCheckResponse.ok) {
          const emailCheckData = await emailCheckResponse.json();
         
          if (tokenData.isadmin == true) {
            router.push("dashboard");
          }
          else if (emailCheckData.exists) {
            router.push("/career-portal/applicationstatus");
          } else {
            router.push("/career-portal/applicationform");
          }
        } else {
          const errorData = await emailCheckResponse.json();
          throw new Error(errorData.error || "Failed to check submission status");
        }
      } else {
        if (response.status === 401) {
          const data = await response.json();
          const { error } = data;
          setErrorMessage(error || "Invalid username or password");
        } else {
          setErrorMessage("Failed to log in. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(error.message || "An unexpected error occurred");
    } finally {
      setislogging(false);
    }
  };



  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="flex h-screen bg-[#014399]">
      <div className="hidden lg:flex lg:w-[40%] bg-gray-500">
        <div className="w-full bg-login-image"></div>
      </div>
    
      <div className="lg:w-[60%] w-full pt-5">
        <div className="flex  justify-center">
          <div>
            <div className="flex justify-between items-center">
              <img className="w-20 h-20" src="logo.png" alt="logo" />
            </div>
            <div className="flex justify-center">
              {/* <h3 className="text-3xl mt-5 text-white">NextGen Leaders Program</h3> */}
            </div>
          </div>
        </div>
        <main className="flex   p-2  justify-center h-[70%]">
          <div className="border-2 border-gray-200  rounded w-96 p-4">
            <h1 className="text-4xl font-bold mb-4 font-spartan text-white">Sign In</h1>
            <button
              onClick={handleSignUp}
              className="text-white text-lg font-spartan hover:underline w-full flex justify-end"
            >
              Register
            </button>
            <span className="text-white">{errorMessage}</span>
            <form onSubmit={handleLogin}>
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
                  className="mt-1 p-2 border-2 border-gray-400 rounded-full w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="userPassword"
                  className="block text-lg font-spartan font-medium text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showUserPassword ? "text" : "password"}
                    id="userPassword"
                    className="mt-1 p-2 border-2 border-gray-400 rounded-full w-full"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                  />
                  <span
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowUserPassword(!showUserPassword)}
                  >
                    {showUserPassword ? (
                      <span className="text-blue-600">Hide</span>
                    ) : (
                      <span className="text-blue-600">Show</span>
                    )}
                  </span>
                </div>
              </div>
    
              <button
                className="bg-blue-500   flex justify-center text-white p-2 rounded-full hover:bg-blue-600 w-full"
                type="submit"
                disabled={islogging}
              >
                {islogging ? <SpinnerIcon /> : <div>Login</div>}
              </button>
              <div className="text-right  mt-2">
              <Link
              
                  href="/forgotpassword"
                  className="text-white hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="text-center mt-2">
                <br />
              </div>
              <br />
            </form>
          </div>
        </main>
      </div>
    </div>
    
      );
    };
    
    export default Login;
    