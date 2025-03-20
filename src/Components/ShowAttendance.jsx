import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

function ShowAttendance() {
  const messageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      messageRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'bounce.out', repeat: -1, yoyo: true }
    );
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1
        ref={messageRef}
        className="text-3xl font-bold text-gray-800 bg-yellow-300 px-4 py-2 rounded-md shadow-lg"
      >
        🚧 This page is under construction! 🚧
      </h1>
    </div>
  );
}

export default ShowAttendance;
