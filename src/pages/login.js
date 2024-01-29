import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import parseJwt from "@/components/parsetoken";
import SpinnerIcon from "@/components/SpinnerIcon";

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
        // Reset form after successful login
        setEmail("");
        setUserPassword("");

        if (!token) {
          router.push("/login");
        }

        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Parse token data
        const tokenData = parseJwt(token);

        if (tokenData.isadmin == true) {
          router.push("dashboard");
        } else if (tokenData.isadmin == false) {
          router.push("/career");
        }
      } else {
        if (response.status === 401) {
          // Handle 401 status (Unauthorized)
          const data = await response.json();
          const { error } = data;

          if (error === "Invalid username or password") {
            setislogging(false);
            // Display the specific error message on the screen
            setErrorMessage(error);
          } else {
            setislogging(false);
            // Handle other 401 errors
            setErrorMessage("Unauthorized: Invalid username or password");
          }
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An unexpected error occurred");
      setislogging(false);
    }
  };

  useEffect(() => {
    if (session) {
      router.push("/career");
    }
  }, [session]);

  const handleForgotPassword = () => {
    router.push("/changepassword");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="hidden lg:flex lg:w-[40%]  brightness-75 blur-sm bg-gray-500 ">
        <div className="w-full  bg-login-image"></div>
      </div>

      <div className="lg:w-[60%] w-[100%] pt-5">
        <div className="flex gap-5 mt-5 justify-center">
          <img className="w-20 h-20" src="logo.png" alt="logo" />
          <h3 className="text-3xl mt-5 text-gray-500">Haidri Beverages</h3>
        </div>
        <main className="flex pt-10 justify-center">
          <div className=" border-2 border-gray-200 rounded w-96 p-4">
            <h1 className="text-2xl font-bold mb-4">Sign in</h1>
            <span>{errorMessage}</span>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
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
              <div className="mb-4">
                <label
                  htmlFor="userPassword"
                  className="block text-sm font-medium text-gray-600"
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
              {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
              )}
              <button
                className="bg-blue-500 flex justify-center text-white p-2 rounded-full hover:bg-blue-600 w-full"
                type="submit"
              >
                {islogging ? <SpinnerIcon /> : <div>Login</div>}
              </button>
              <div className="text-center mt-2">
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="text-blue-500 hover:underline"
                >
                  Forgot Password?
                </a>
                <span className="mx-2">|</span>
                <button
                  onClick={handleSignUp}
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </button>
                <br />
              </div>
              <br></br>
              <div className="w-full h-[20px] border-b-2  text-center pb-5">
                <span className="text-[17px] bg-white  text-gray-500">
                 OR
                </span>
              </div>
              <br></br>
              <button
                onClick={() => signIn("github")}
                className="text-4xl text-black w-full p-2 rounded-full border flex justify-center"
              >
                <FaGithub />
              </button>
              <button
                onClick={() => signIn("google")}
                className="text-4xl text-[#4285F4] mt-5 p-2 rounded-full w-full border justify-center flex"
              >
                <FaGoogle />
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
