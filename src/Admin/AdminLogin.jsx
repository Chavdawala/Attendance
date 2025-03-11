import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from "lucide-react"; 

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'Admin@123' && password === 'Admin@789') {
            sessionStorage.setItem("isAdmin", "true");
            console.log("Admin Logged In: ", sessionStorage.getItem("isAdmin"));
            navigate("/userdata");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-200 px-4">
            <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-2xl transform transition duration-300 hover:scale-105 hover:shadow-xl">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h2 className="text-center text-black text-2xl font-bold">Admin Login</h2>
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    {/* Username Input */}
                    <div className="relative flex items-center">
                        <User className="absolute left-3 text-gray-500" size={20} />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full p-3 pl-10 rounded-lg bg-gray-200 focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative flex items-center">
                        <Lock className="absolute left-3 text-gray-500" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-3 pl-10 pr-10 rounded-lg bg-gray-200 focus:ring focus:ring-blue-300"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    
                    {/* Login Button */}
                    <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md">
                        LOGIN
                    </button>
                    <p className="text-center mt-4 text-black">
                        <Link to="/home" className="text-blue-500 cursor-pointer hover:underline">
                            Employee Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;