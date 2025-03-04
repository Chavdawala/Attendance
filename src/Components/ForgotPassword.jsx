import axios from 'axios';
import { useState } from 'react';
import { Mail } from "lucide-react";
import { Link } from 'react-router-dom';

const ForgotPassword =() => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setMessage('');

        console.log('email', email);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/forgot-password`, {email});
            setMessage(response.data.message);


        } catch (error) {
            setMessage(error.message);
        }
    };

    return(
        <>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-200 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-center text-gray-800 text-2xl font-bold">
          Forgot Password
        </h2>
        {message && <p className="text-center text-blue-600 mt-2">{message}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full py-3 pl-12 pr-4 text-gray-700 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <button
            type="submit"
            className="w-full py-3 border text-white font-semibold border-blue-500 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200 shadow-md"
          >
            Send
          </button>

          <p className="text-center mt-4 text-black">
          <Link to="/home" className="text-blue-500 cursor-pointer hover:underline">
            Employee Login
          </Link>
        </p>
        </form>
      </div>
    </div>
        </>
    )
};

export default ForgotPassword;