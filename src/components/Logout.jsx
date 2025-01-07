import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function DateTimeDisplay() {
  const [dateTime, setDateTime] = useState(new Date());
  const [user, setUser] = useState({ name: "", email: "" });
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch user's location on component mount
  useEffect(() => {
    fetchPosition();
  }, []);

  // Function to fetch the user's location
  const fetchPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          console.error("Error fetching location: ", err);
          setStatusMessage("Error fetching location.");
        }
      );
    } else {
      setStatusMessage("Geolocation is not supported by your browser.");
    }
  };

  // Format the date and time for display
  const formatDateTime = (date) => date.toLocaleString();

  // Store logout time in the database
  const storeLogoutTime = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("No JWT token found. Please log in again.");
      return;
    }

    const currentTime = new Date();
    const formattedLogoutTime = currentTime.toLocaleString();

    const name = inputName || user.name;
    const email = inputEmail || user.email;

    if (!email || !name) {
      console.error("User name or email is missing!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/logout",
        {
          logoutTimes: formattedLogoutTime,
          email: email,
          latitude: latitude || "N/A",
          longitude: longitude || "N/A",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setStatusMessage(response.data.message);
      console.log("Logout time stored successfully:", response.data);
    } catch (error) {
      console.error("Error storing logout time:", error.response?.data || error.message);
      setStatusMessage("Error storing logout time.");
    }
  };

  return (
    <>
    <Navbar/>
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ color: "black" }}>Store Logout Time</h1>

      <div style={{ marginTop: "20px" }}>
        <label style={{ fontSize: "16px" }}>
          Name:
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter your name"
            style={{
              marginLeft: "10px",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
        <br />
        <label style={{ fontSize: "16px", marginTop: "10px" }}>
          Email:
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              marginLeft: "10px",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
      </div>

      <h2 style={{ color: "black" }}>Current Date and Time</h2>
      <p style={{ fontSize: "20px", fontWeight: "bold", color: "black" }}>
        {formatDateTime(dateTime)}
      </p>

      <button
        onClick={storeLogoutTime}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Store Logout Time
      </button>

      {statusMessage && (
        <p style={{ color: statusMessage.includes("Error") ? "red" : "green", marginTop: "20px" }}>
          {statusMessage}
        </p>
      )}

      <div style={{ marginTop: "50px" }}>
        <h1 style={{ color: "black" }}>Your Location</h1>
        {latitude && longitude ? (
          <div style={{ marginTop: "20px" }}>
            <h3>Location:</h3>
            <p style={{ color: "black" }}>Latitude: {latitude}</p>
            <p style={{ color: "black" }}>Longitude: {longitude}</p>
          </div>
        ) : (
          <p style={{ color: "black", marginTop: "20px" }}>Fetching your location...</p>
        )}
      </div>
    </div>
    </>
  );
}

export default DateTimeDisplay;
