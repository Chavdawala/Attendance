import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const validatePassword = (password) => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) return "Strong";
    return "Medium";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const userData = { name, email, password };
    console.log('User Data:', userData);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User registered successfully!');
      } else {
        setErrorMessage(data.message || 'Error registering user.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while registering.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-200">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Sign Up</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-3">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name Input */}
          <div className="relative flex items-center">
            <User className="absolute left-3 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 pl-10 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Email Input */}
          <div className="relative flex items-center">
            <Mail className="absolute left-3 text-gray-500" size={20} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 pl-10 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Password Input */}
          <div className="relative flex items-center border rounded-md p-2">
            <Lock className="absolute left-3 text-gray-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordStrength(validatePassword(e.target.value));
              }}
              className="w-full pl-10 pr-10 text-gray-700 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative flex items-center border rounded-md p-2">
            <Lock className="absolute left-3 text-gray-500" size={20} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-10 text-gray-700 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Password Strength Indicator (Now Below Confirm Password) */}
          {password && (
            <p className={`text-sm text-center ${passwordStrength === "Weak" ? "text-red-500" : passwordStrength === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
              {passwordStrength} Password
            </p>
          )}

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Back to Login Option */}
        <p className="text-center mt-4 text-black">
          <Link to="/home" className="text-blue-500 cursor-pointer hover:underline">
            Already have an Account?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;