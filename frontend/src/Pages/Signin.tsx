import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });

    // Handle API call for sign-in
    console.log(BACKEND_URL);
    const response=await axios.post(`${BACKEND_URL}/signin`,{
        email,password
    });

    if(response.data.token){
        localStorage.setItem('token',response.data.token);
        navigate("/dashboard")
    }

    console.log(response);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
          >
            Sign In
          </button>

        <div className="mt-4">
            <p>
                Don't have an account?{" "}
                <span
                onClick={() => navigate("/register")} // use navigate to switch to signup page
                className="text-blue-500 cursor-pointer"
                >
                Sign up here
                </span>
            </p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
