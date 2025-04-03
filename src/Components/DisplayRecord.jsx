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

        console.log("✅ Attendance Records:", attendanceResponse.data.records);
        console.log("✅ Logout Records:", logoutResponse.data.records);

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

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => (prev > 3 ? prev - 3 : 3));
  };

  // ✅ Function to correctly find matching logout time
  const findMatchingLogout = (loginTime) => {
    return logoutRecords.find((logout) => new Date(logout.time) >= new Date(loginTime)) || null;
  };

  return (
    <div className="flex justify-center bg-white p-6">
      <div className="w-full max-w-4xl bg-white p-8 shadow-sm border border-gray-200 border-t-0 rounded-b-lg">
        <h1 ref={titleRef} className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Attendance Summary
        </h1>

        {/* ✅ Debugging: Display fetched data */}
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(attendanceRecords, null, 2)}</pre>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(logoutRecords, null, 2)}</pre>

        {attendanceRecords.length > 0 ? (
          <div className="w-full bg-sky-50 shadow-sm rounded-lg p-6">
            {attendanceRecords.slice(0, visibleCount).map((record, index) => {
              const logoutRecord = findMatchingLogout(record.time);

              return (
                <div
                  key={record._id} // ✅ Using unique _id instead of index
                  ref={(el) => (recordsRef.current[index] = el)}
                  className="border-b py-4 text-center last:border-b-0"
                >
                  <p className="text-gray-700">
                    <strong>Login Time:</strong> {new Date(record.time).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <strong>Logout Time:</strong> {logoutRecord ? new Date(logoutRecord.time).toLocaleString() : "Not logged out yet"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Location:</strong> {record.latitude}, {record.longitude}
                  </p>
                </div>
              );
            })}

            <div className="mt-4 flex justify-center gap-4">
              {visibleCount < attendanceRecords.length && (
                <button
                  onClick={handleShowMore}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Show More
                </button>
              )}
              {visibleCount > 3 && (
                <button
                  onClick={handleShowLess}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Show Less
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No attendance records found.</p>
        )}
      </div>
    </div>
  );
}

export default AttendanceSummary;
