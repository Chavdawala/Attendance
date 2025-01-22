import React, { useState } from 'react';
import './UserData';
import './AdminLogin.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Check if admin credentials are entered
            if (username === 'Admin@123' && password === 'Admin@789') {
                // Redirect to Jobpost page
                window.location.href = '/UserData';
            } else {
                // Handle incorrect credentials
                console.error('Invalid username or password');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 style={{color:'black'}}>Admin Login</h2>
                <table>
                    
                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button type="submit">Login</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Login;
