import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;

  const handleSignUp =async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password });

    // Handle API call for sign-up
    console.log(BACKEND_URL);
    const response=await axios.post(`${BACKEND_URL}/users`,{
        name,email,password
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
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
            Sign Up
          </button>

        <div className="mt-4">
            <p>
                Already have an account?{" "}
                <span
                onClick={() => navigate("/login")} // use navigate to switch to signup page
                className="text-blue-500 cursor-pointer"
                >
                Sign in here
                </span>
            </p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
