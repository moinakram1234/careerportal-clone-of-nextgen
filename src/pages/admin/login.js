// pages/Login.js
import React, { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    // Add your authentication logic here
    // For simplicity, let's assume a username "ali" and password "123"
    if (username === "ali" && password === "123") {
      // Navigate to '/dashboard' upon successful login
      router.push("admin/dashboard");

      setErrorMessage("");
      alert("Login successful!"); // Replace with your redirection logic
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="bg-white"> 
    <div className="flex pt-10 pl-10 drop"> <img className="w-32" src="logo.png" alt="logo" /><h3 className="text-2xl mt-12">Haidri Beverages</h3></div>
    <main className=" w-full h-screen flex  justify-center">
      <div className="  max-h-96 border-2 border-gray-200 rounded w-96 p-4">
        <h1 className="text-2xl font-bold mb-4">sign in</h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 p-2 border-2 border-gray-400 rounded-full w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="mt-1 p-2  border-2 border-gray-400 rounded-full w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <span className="text-blue-600">hide</span>
              ) : (
                <span className="text-blue-600">show</span>
              )}
            </span>
          </div>
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <button
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </main>
    </div>
  );
};

export default Login;
