import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock } from "lucide-react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Home = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError("Email and password are required.");
            return;
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                email: formData.email.trim(),
                password: formData.password,
            });

            const { authToken, user } = res.data;
            sessionStorage.setItem("authToken", authToken);
            sessionStorage.setItem("userId", user.id);
            sessionStorage.setItem("userName", user.name);
            sessionStorage.setItem("userEmail", user.email);
            navigate("/index", { replace: true });
        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.message || "Invalid email or password.");
        }
    };

    const handleGoogleLoginSuccess = async (response) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/google-login`, {
                credential: response.credential,
            });

            const { authToken, user } = res.data;
            sessionStorage.setItem("authToken", authToken);
            sessionStorage.setItem("userId", user.id);
            sessionStorage.setItem("userName", user.name);
            sessionStorage.setItem("userEmail", user.email);
            navigate("/index", { replace: true });
        } catch (err) {
            console.error("Google Login Error:", err);
            setError("Google login failed. Please try again.");
        }
    };

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4 animate-fadeIn">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transition-transform transform hover:scale-105">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h2 className="text-center text-black text-2xl font-bold">Login</h2>
                        {error && <p className="text-red-500 text-center">{error}</p>}

                        {/* Email Input */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Email"
                                required
                                className="w-full pl-10 py-3 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Password"
                                required
                                className="w-full pl-10 pr-10 py-3 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
                            />
                            <div className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md shadow-md transition duration-200"
                        >
                            LOGIN
                        </button>

                        {/* Google Login Button */}
                        <div className="w-full flex justify-center mt-4">
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={() => setError("Google login was unsuccessful.")}
                                useOneTap
                            />
                        </div>

                        {/* Admin Login */}
                        <p className="text-center text-sm text-gray-600">
                            Login as{" "}
                            <Link to="/AdminLogin" className="text-blue-500 hover:underline">
                                Admin?
                            </Link>
                        </p>

                        {/* Signup Link */}
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-blue-500 hover:underline">
                                Create Your Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Home;