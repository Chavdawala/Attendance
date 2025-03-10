import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const teamRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      videoRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
    );

    gsap.fromTo(
      textRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
    );

    gsap.fromTo(
      teamRef.current.children,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      galleryRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  // Team Members Data
  const teamMembers = [
    { name: "Alice Johnson", role: "Project Manager", image: "1.jpeg" },
    { name: "Bob Smith", role: "Software Engineer", image: "2.jpeg" },
    { name: "Charlie Brown", role: "UI/UX Designer", image: "3.jpeg" },
    { name: "David Lee", role: "Frontend Developer", image: "4.jpeg" },
    { name: "Emma Wilson", role: "Backend Developer", image: "5.jpeg" },
    { name: "Frank White", role: "DevOps Engineer", image: "6.jpeg" },
    { name: "Grace Adams", role: "QA Engineer", image: "7.jpeg" },
    { name: "Henry Green", role: "Data Scientist", image: "8.jpeg" },
    { name: "Ivy Thompson", role: "Product Owner", image: "9.jpg" }
  ];

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font overflow-hidden bg-sky-50">
        <div className="container px-5 py-8 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <video ref={videoRef} className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" autoPlay muted loop>
              <source src="a1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div ref={textRef} className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CareerNaksha</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">About Us</h1>
              <p className="leading-relaxed">
                CSERF is a non-political, non-profit, non-government foundation to promote career research & development activities for youth. Our social work addresses issues in sustainable education & skill development sectors. Our CSR vision is to build a foundation with rock-solid sustainable goals to provide support, assistance and growth to students & youths of India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Our Team</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              CareerNaksha is the most trusted online offline career counselling & career guidance platform for students connecting top career counsellors in India.
            </p>
          </div>
          <div ref={teamRef} className="flex flex-wrap -m-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-4 md:w-1/3 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt={member.name} className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={member.image} />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">{member.name}</h2>
                    <p className="text-gray-500">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glimpse of Events Section */}
      <section className="text-gray-600 body-font bg-sky-50">
        <div className="container px-5 py-16 mx-auto flex flex-wrap">
          <div className="flex w-full mb-4 flex-wrap">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">Glimpse of Events</h1>
          </div>
          <div ref={galleryRef} className="flex flex-wrap md:-m-2 -m-1">
            {["C1.jpeg", "C2.jpeg", "C3.jpeg", "C4.jpeg", "C5.jpeg", "C6.jpeg"].map((src, index) => (
              <div key={index} className="md:p-2 p-1 w-1/2">
                <img alt="gallery" className="w-full object-cover h-full object-center block" src={src} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
