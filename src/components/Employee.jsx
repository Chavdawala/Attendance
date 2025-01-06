import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employee.css';
import Navbar from './Navbar';

const Employee = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loginRecordsToShow, setLoginRecordsToShow] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('Fetching user data...');
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user`);
                console.log('Full Response:', response);

                setUserData(response.data.users); // Adjust if response structure changes
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err.response ? err.response.data.message : 'An unexpected error occurred.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleShowMore = (userIndex) => {
        setLoginRecordsToShow((prev) => ({
            ...prev,
            [userIndex]: (prev[userIndex] || 2) + 15, // Show 2 more records each time
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <h3>Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <>
        <Navbar/>
        <div className="employee-container">
            {userData && userData.length > 0 ? (
                <>
                    <h2 style={{ color: 'black' }}>Employee Details</h2>
                    <div className="employee-details">
                        {userData.map((user, index) => (
                            <div key={index} className="user-detail">
                                <p style={{ color: 'black' }}><strong>Name:</strong> {user.name}</p>
                                <p style={{ color: 'black' }}><strong>Email:</strong> {user.email}</p>
                                {user.loginTimes && user.loginTimes.length > 0 ? (
                                    <div className="login-history">
                                        <h3 style={{ color: 'black' }}>Login History</h3>
                                        <ul>
                                            {user.loginTimes.slice(0, loginRecordsToShow[index] || 2).map((login, loginIndex) => (
                                                <li key={loginIndex}>
                                                    <p style={{ color: 'black' }}>Time: {new Date(login.time).toLocaleString()}</p>
                                                    {login.latitude && login.longitude && (
                                                        <p style={{ color: 'black' }}>Location: {login.latitude}, {login.longitude}</p>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                        {user.loginTimes.length > (loginRecordsToShow[index] || 2) && (
                                            <button onClick={() => handleShowMore(index)} style={{ color: 'white', cursor: 'pointer' }}>
                                                Show More
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <p style={{ color: 'black' }}>No login history available</p>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>No employee data available</p>
            )}
        </div>
        </>
    );
};

export default Employee;
