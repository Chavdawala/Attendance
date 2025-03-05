import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Email from "./Email";
import Navbar from "./Navbar";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const Help = () => {
  const sectionsRef = useRef([]);
  const headingRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    // Heading Animation
    gsap.from(headingRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.out",
    });

    // Section Animation (Cards)
    sectionsRef.current.forEach((section, index) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    // Floating Effect for Images
    imagesRef.current.forEach((img, index) => {
      gsap.to(img, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "power1.inOut",
        delay: index * 0.2,
      });
    });
  }, []);

  // Data for images and descriptions
  const helpData = [
    {
      image: "/login.png",
      title: "Clock-in - Recording Your Login Time & Location",
      description:
        "This page allows employees and interns to log their attendance by storing the current date, time, and location. Enter your name and email, check the date & location, and click 'Store Date and Time'.",
    },
    {
      image: "/logout.png",
      title: "Clock-out - Recording Your Logout Time & Location",
      description:
        "This page allows employees and interns to record their logout time along with their location. Simply enter your details and click 'Store Date and Time' to complete the logout process.",
    },
    {
      image: "/data.png",
      title: "Employee Dashboard Overview",
      description:
        "The home page displays employee details only after the admin has added them to the database. It provides a personalized experience and ensures only authorized users can access their attendance records.",
    },
    {
      image: "/attendance.png",
      title: "Attendance Summary Overview",
      description:
        "This section shows a user's attendance log with login time, logout time (if recorded), and location details. Multiple entries appear if a user logs in multiple times without logging out.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="w-full p-6 flex justify-center min-h-screen">
        <div className="max-w-6xl w-full">
          <h1
            ref={headingRef}
            className="text-3xl font-bold text-center mb-6 opacity-0"
          >
            Welcome to the Career Naksha Help Desk
          </h1>
          <p className="text-center mb-8 text-lg text-gray-700">
            This portal is designed to help employees and interns mark their attendance efficiently.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {helpData.map((item, index) => (
              <div
                key={index}
                ref={(el) => (sectionsRef.current[index] = el)}
                className="shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:bg-sky-50 opacity-0"
              >
                <img
                  ref={(el) => (imagesRef.current[index] = el)}
                  src={item.image}
                  alt={item.title}
                  className="w-full h-72 object-contain rounded-md mb-4 border border-gray-300"
                />
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h2>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Email />
      <Footer />
    </>
  );
};

export default Help;
