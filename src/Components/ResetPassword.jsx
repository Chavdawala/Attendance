import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Lock } from "lucide-react"; 

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password`, {
                token,
                password: password.trim(),
            });
            setMessage(response.data.message);
            setTimeout(() => navigate("/"), 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to reset password.");
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-200 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-center text-gray-800 text-2xl font-bold">Reset Password</h2>
        {message && <p className="text-center text-blue-600 mt-2">{message}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleReset}>
          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              required
              className="w-full py-3 pl-12 pr-10 text-gray-700 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            {showPassword ? (
              <EyeOff 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full py-3 text-white font-semibold bg-blue-500 border border-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
    );
};

export default ResetPassword;