import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const CareerNaksha = () => {
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const titleRef = useRef(null);
  const videoOverlayRef = useRef(null);

  useEffect(() => {
    // Fade in and slide up for content
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Slow-motion effect for title (Coming from bottom)
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0, scale: 0.9 }, // Start lower on the screen
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 2.5, // Slow-motion effect (Increase duration)
        ease: "power4.out", // Smooth easing effect
        delay: 0.3 
      }
    );

    // Fade in overlay for smooth effect
    gsap.to(videoOverlayRef.current, {
      opacity: 0.5,
      duration: 1.5,
      ease: "power2.inOut",
    });

    // Button hover effect (subtle breathing effect)
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.95 },
      {
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        repeat: -1,
        yoyo: true,
      }
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/back.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div ref={videoOverlayRef} className="absolute inset-0 bg-black opacity-0"></div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 lg:px-0 max-w-2xl mx-auto">
        <h1 ref={titleRef} className="text-4xl lg:text-6xl font-extrabold mb-4">
          CareerNaksha
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Welcome to Our Attendance Portal
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            ref={buttonRef}
            to="/home"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CareerNaksha;
