import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { FaSignInAlt, FaSignOutAlt, FaMapMarkerAlt } from "react-icons/fa";

function AttendanceSummary() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [logoutRecords, setLogoutRecords] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const titleRef = useRef(null);
  const recordsRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = sessionStorage.getItem("authtoken");
      const userEmail = sessionStorage.getItem("userEmail");
      if (!userEmail) return;

      try {
        // Fetch attendance and logout records simultaneously
        const [attendanceResponse, logoutResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
            params: { email: userEmail },
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, {
            params: { email: userEmail },
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);

        if (attendanceResponse.data.records) {
          setAttendanceRecords(attendanceResponse.data.records);
        }
        if (logoutResponse.data.records) {
          setLogoutRecords(logoutResponse.data.records);
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    recordsRef.current.forEach((el, index) => {
      if (el) {
        gsap.from(el, {
          x: index % 2 === 0 ? 100 : -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.2,
        });
      }
    });
  }, [visibleCount]);

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);
  const handleShowLess = () => setVisibleCount((prev) => (prev > 3 ? prev - 3 : 3));

  const findMatchingLogout = (loginTime) => {
    return logoutRecords.find((logout) => new Date(logout.time) >= new Date(loginTime)) || null;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-6">
      <div className="w-full max-w-4xl bg-white bg-opacity-30 backdrop-blur-md p-8 shadow-lg border border-gray-300 rounded-xl">
        <h1 ref={titleRef} className="text-4xl font-extrabold text-gray-800 mb-6 text-center tracking-wide">
          Attendance Summary
        </h1>

        {attendanceRecords.length > 0 ? (
          <div className="w-full bg-white bg-opacity-40 shadow-md rounded-xl p-6">
            {attendanceRecords.slice(0, visibleCount).map((record, index) => {
              const logoutRecord = findMatchingLogout(record.time);
              return (
                <div
                  key={record._id}
                  ref={(el) => (recordsRef.current[index] = el)}
                  className="relative flex flex-col sm:flex-row items-center justify-between bg-white bg-opacity-80 p-5 rounded-lg shadow-md mb-4 transition hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FaSignInAlt className="text-blue-500 text-xl" />
                    <p className="text-gray-800">
                      <strong>Login:</strong> {new Date(record.time).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaSignOutAlt className="text-red-500 text-xl" />
                    <p className="text-gray-800">
                      <strong>Logout:</strong> {logoutRecord ? new Date(logoutRecord.time).toLocaleString() : "Not logged out yet"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-green-500 text-xl" />
                    <p className="text-gray-800">
                      <strong>Location:</strong> {record.latitude}, {record.longitude}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="mt-6 flex justify-center gap-4">
              {visibleCount < attendanceRecords.length && (
                <button
                  onClick={handleShowMore}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 transition"
                >
                  Show More
                </button>
              )}
              {visibleCount > 3 && (
                <button
                  onClick={handleShowLess}
                  className="bg-gray-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-gray-600 transition"
                >
                  Show Less
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-700 text-center text-lg font-semibold">No attendance records found.</p>
        )}
      </div>
    </div>
  );
}

export default AttendanceSummary;
