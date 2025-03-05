import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Card() {
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Heading Animation
    gsap.from(textRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 90%",
      },
    });

    // Card Animations
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        height: 0,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      });
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 bg-sky-50">
      <h1 ref={textRef} className="text-3xl font-bold mb-8 text-center text-gray-400">
        Empower your career journey | Know your strengths | Achieve your goals
      </h1>
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Loved by an enthusiastic community of over a million students, parents, professionals & counsellors
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {["g1.png", "g2.png", "g3.png", "g4.png"].map((src, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <img src={src} alt="Card Image" className="w-full mb-4" />
            <h2 className="text-lg font-semibold mb-2">Card Title {index + 1}</h2>
            <p>Some descriptive text about the card content goes here.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
