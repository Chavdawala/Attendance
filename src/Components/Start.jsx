import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const CareerNaksha = () => {
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const videoOverlayRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Background Overlay Animation (Parallax Fade-In)
    tl.to(videoOverlayRef.current, {
      opacity: 0.5,
      duration: 1.5,
      ease: "power2.inOut",
    });

    // Title Animation (Slow-Motion Rise from Bottom with Blur)
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 100, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.8, ease: "power4.out" }
    );

    // Subtitle Animation (Fade In & Slight Slide-Up)
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=1" // Starts before title animation fully ends
    );

    // Button Animation (Fade-In, Scale-Up & Glow Effect)
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.6)" }
    );

    // Button Glow Effect (Looping)
    gsap.to(buttonRef.current, {
      boxShadow: "0px 0px 20px rgba(0, 122, 255, 0.8)",
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

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
        <p ref={subtitleRef} className="text-lg text-gray-300 mb-6">
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
