import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import gsap from "gsap";

function DisplayData() {
    const [data, setData] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");
    const textRef = useRef(null);
    const logoRef = useRef(null);
    const boxRefs = useRef([]);

    useEffect(() => {
        const fetchData = async () => {
            const authToken = sessionStorage.getItem("authtoken");
            const userEmail = sessionStorage.getItem("userEmail");

            if (!userEmail) {
                setStatusMessage("No email found in sessionStorage.");
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/getUser/${userEmail}`,
                    { headers: { Authorization: `Bearer ${authToken}` } }
                );

                if (response.data) {
                    setData(response.data);
                    setStatusMessage("Data fetched successfully.");
                } else {
                    setStatusMessage("No data found.");
                }
            } catch (error) {
                console.error("Error fetching data:", error.response?.data || error.message);
                setStatusMessage("Error fetching data.");
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data?.user) {
            gsap.fromTo(
                textRef.current,
                { width: "0px" },
                { width: "100%", duration: 2, ease: "power2.out" }
            );

            gsap.fromTo(
                logoRef.current,
                { rotateY: 180 },
                { rotateY: 0, duration: 1, ease: "power2.out" }
            );

            gsap.fromTo(
                boxRefs.current,
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power2.out" }
            );
        }
    }, [data]);

    return (
        <div className="flex flex-col items-center justify-center bg-white p-6 w-full">
            <div className="w-full max-w-4xl bg-white rounded-t-lg p-8 shadow-sm border border-gray-200 border-b-0">
                <div className="flex flex-col md:flex-row items-center md:items-center border-b pb-6 mb-6">
                    <div className="md:w-1/3 flex justify-center md:justify-start">
                        <img ref={logoRef} src="/logo.png" alt="logo" className="h-28 md:h-36 w-auto" />
                    </div>

                    <div className="md:w-2/3 flex justify-center md:justify-end">
                        <p ref={textRef} className="text-gray-800 text-2xl md:text-3xl font-semibold text-center md:text-right leading-snug overflow-hidden whitespace-nowrap">
                            {data?.user ? (
                                <>Hello, {data.user.firstname}! <br /> Welcome To Career Naksha <br /> Attendance Portal</>
                            ) : (
                                <span className="text-gray-600 text-lg md:text-2xl">{statusMessage}</span>
                            )}
                        </p>
                    </div>
                </div>

                {data?.user && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {["Department", "First Name", "Last Name"].map((key, index) => (
                                <div key={key} ref={(el) => (boxRefs.current[index] = el)} className="bg-gray-100 p-4 rounded-lg text-gray-800 shadow-sm">
                                    <strong>{key}:</strong> {data.user[key.toLowerCase().replace(/ /g, "")] || "N/A"}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {["Email", "Job Type"].map((key, index) => (
                                <div key={key} ref={(el) => (boxRefs.current[index + 3] = el)} className="bg-gray-100 p-4 rounded-lg text-gray-800 shadow-sm">
                                    <strong>{key}:</strong> {data.user[key.toLowerCase().replace(/ /g, "")] || "N/A"}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DisplayData;