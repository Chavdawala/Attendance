// src/utils/attendanceUtils.js
import axios from "axios";

export const markAttendance = async (userEmail, selectedDate, status, setAttendance, setAttendanceStatus) => {
  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/markAttendance/${userEmail}`, {
      date: selectedDate,
      status,
    });

    setAttendance(prev => ({ ...prev, [selectedDate]: status }));
    setAttendanceStatus(`Attendance for ${selectedDate} marked as: ${status}`);
  } catch (error) {
    console.error("Error marking attendance:", error);
  }
};
