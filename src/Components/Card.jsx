import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Card() {
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Heading Animation
    gsap.from(headingRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.6, // Decreased duration
      ease: "power2.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
      },
    });

    // Cards Animation
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: index % 2 === 0 ? -150 : 150, // Alternate directions (reduced distance)
        scaleY: 0,
        duration: 0.6, // Faster animation
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%", // Triggers earlier as user scrolls
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 bg-sky-50">
      {/* Headings */}
      <h1 ref={headingRef} className="text-3xl font-bold mb-8 text-center text-gray-400">
        Empower your career journey | Know your strengths | Achieve your goals
      </h1>
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Loved by an enthusiastic community of over a million students, parents, professionals & counsellors
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { img: "g1.png", title: "Career Development & Growth", desc: "Empower employees with career planning, upskilling programs, and mentorship opportunities to help them grow within the company." },
          { img: "g2.png", title: "Performance & Skill Enhancement", desc: "Track employee performance, identify skill gaps, and provide training programs for continuous professional development." },
          { img: "g3.png", title: "Career Pathway & Promotions", desc: "Guide employees on career progression within the company, offering clear pathways for promotions and role advancements." },
          { img: "g4.png", title: "Employee Engagement & Well-being", desc: "Foster a productive work environment with career counseling, wellness programs, and work-life balance initiatives." }
        ].map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <img src={item.img} alt={item.title} className="w-full mb-4" />
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
