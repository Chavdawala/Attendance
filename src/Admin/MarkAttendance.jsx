import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { markAttendance } from "../Utils/attendanceUtils";

export default function MarkAttendanceSystem() {
  const [attendance, setAttendance] = useState({});
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [userEmail, setUserEmail] = useState("");
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailFromURL = searchParams.get("email");
    const storedEmail = sessionStorage.getItem("userEmail");

    if (emailFromURL) {
      setUserEmail(emailFromURL);
      sessionStorage.setItem("userEmail", emailFromURL);
    } else if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!userEmail) return;

      try {
        const cachedAttendance = sessionStorage.getItem(`attendance-${userEmail}`);
        if (cachedAttendance) {
          const parsedAttendance = JSON.parse(cachedAttendance);
          setAttendance(parsedAttendance);
          calculateTotals(parsedAttendance);
        } else {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/getmarkAttendance/${userEmail}`
          );
          const fetchedAttendance = response.data.markAttendance.reduce((acc, entry) => {
            acc[entry.date] = entry.status;
            return acc;
          }, {});
  
          setAttendance(fetchedAttendance);
          sessionStorage.setItem(`attendance-${userEmail}`, JSON.stringify(fetchedAttendance));
          calculateTotals(fetchedAttendance);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, [userEmail]);

  const calculateTotals = (attendanceData) => {
    let presentDays = 0;
    let absentDays = 0;

    Object.values(attendanceData).forEach((status) => {
      if (status === "Present") presentDays++;
      if (status === "Absent") absentDays++;
    });

    setPresentCount(presentDays);
    setAbsentCount(absentDays);
  };

  const updateAttendance = (date, status) => {
    const updatedAttendance = { ...attendance, [date]: status };
    setAttendance(updatedAttendance);
    sessionStorage.setItem(`attendance-${userEmail}`, JSON.stringify(updatedAttendance));
    calculateTotals(updatedAttendance);
  };

  const changeMonth = (offset) => {
    setCurrentMonth((prev) => (prev + offset + 12) % 12);
    setCurrentYear((prev) => (prev + Math.floor((currentMonth + offset) / 12)));
  };

  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    return (
      <>
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} className="h-10"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
          return (
            <div
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`h-12 flex items-center justify-center rounded-md cursor-pointer text-sm font-medium border 
                ${attendance[date] === "Present" ? "bg-green-500 text-white" : 
                attendance[date] === "Absent" ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {i + 1}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl text-center w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-700">Attendance System</h1>
        <p className="text-lg text-gray-600 mt-2">User: {userEmail}</p>

        <div className="mt-4 grid grid-cols-2 gap-4 border p-3 rounded-md bg-gray-100">
          <p className="text-green-600 font-semibold text-center">Present: {presentCount}</p>
          <p className="text-red-600 font-semibold text-center">Absent: {absentCount}</p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button onClick={() => changeMonth(-1)} className="px-4 py-2 bg-blue-400 text-white rounded-md shadow hover:bg-blue-500">◀ Prev</button>
          <p className="text-lg font-semibold">
            {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long", year: "numeric" })}
          </p>
          <button onClick={() => changeMonth(1)} className="px-4 py-2 bg-blue-400 text-white rounded-md shadow hover:bg-blue-500">Next ▶</button>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mt-4 px-4 py-2 border rounded-md w-full text-center"
        />
        {renderCalendar()}
      </div>
    </div>
  );
}