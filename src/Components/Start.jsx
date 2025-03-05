import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const CareerNaksha = () => {
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // **🔹 Background Overlay Fade-in Effect**
    tl.to(videoOverlayRef.current, {
      opacity: 0.7, 
      duration: 1.5, 
      ease: "power2.inOut",
    });

    // **🔹 Cinematic Title Reveal Effect**
    tl.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.5, rotationX: 90, y: 100 }, // Starts from a lower position with rotation
      { 
        opacity: 1, 
        scale: 1, 
        rotationX: 0, 
        y: 0, 
        duration: 2, 
        ease: "elastic.out(1, 0.6)", 
        delay: 0.2 
      }
    );

    // **🔹 Content Fade-in with Staggered Effect**
    tl.fromTo(
      contentRef.current.children, 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out", 
        stagger: 0.3 
      }, "-=1"
    );

    // **🔹 Button Magnetic Hover Effect**
    const button = buttonRef.current;
    button.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.1;
      const y = (e.clientY - top - height / 2) * 0.1;

      gsap.to(button, { x, y, duration: 0.3, ease: "power2.out" });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    });

  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {/* 🔥 Background Video */}
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/back.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div ref={videoOverlayRef} className="absolute inset-0 bg-black opacity-0"></div>
      </div>

      {/* 🔥 Content */}
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
