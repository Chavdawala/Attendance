import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import axios from "axios";

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

        setAttendanceRecords(attendanceResponse.data.records || []);
        setLogoutRecords(logoutResponse.data.records || []);
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 p-6">
      <div className="w-full max-w-4xl bg-white bg-opacity-30 backdrop-blur-lg shadow-2xl border border-gray-300 rounded-2xl p-10">
        <h1 ref={titleRef} className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-wide">
          Attendance Summary
        </h1>

        {attendanceRecords.length > 0 ? (
          <div className="w-full bg-white bg-opacity-50 shadow-md rounded-xl p-6 mt-6">
            {attendanceRecords.slice(0, visibleCount).map((record, index) => {
              const logoutRecord = findMatchingLogout(record.time);
              return (
                <div
                  key={record._id}
                  ref={(el) => (recordsRef.current[index] = el)}
                  className="flex flex-col sm:flex-row justify-between items-center bg-white bg-opacity-90 p-5 rounded-lg shadow-md mb-4 transition transform hover:scale-105 hover:shadow-xl"
                >
                  <p className="text-gray-800">
                    <strong className="text-blue-600">Login:</strong> {new Date(record.time).toLocaleString()}
                  </p>
                  <p className="text-gray-800">
                    <strong className="text-red-600">Logout:</strong> {logoutRecord ? new Date(logoutRecord.time).toLocaleString() : "Not logged out yet"}
                  </p>
                </div>
              );
            })}

            <div className="mt-6 flex justify-center gap-4">
              {visibleCount < attendanceRecords.length && (
                <button
                  onClick={handleShowMore}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
                >
                  Show More
                </button>
              )}
              {visibleCount > 3 && (
                <button
                  onClick={handleShowLess}
                  className="bg-gray-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-gray-700 transition transform hover:scale-105"
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
