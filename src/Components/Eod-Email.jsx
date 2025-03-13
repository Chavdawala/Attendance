import React from 'react';

function Email() {
  const email = "harshchavda529@gmail.com";
  const subject = "EOD Report - [Your Name]";
  const body = `Hello,\n\nHere is my EOD (End of Day) report:\n\n- Tasks Completed: \n- Challenges Faced: \n- Plans for Tomorrow: \n\nBest Regards,\n[Your Name]`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-400">End of Day Report</h1>
        <p className="text-gray-300 mb-6">
          Please submit your **EOD (End of Day) report** by clicking the button below. 
          Your email will be pre-filled with the required format.
        </p>

        <a
          href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 transform hover:scale-105"
        >
          Send EOD Report 📧
        </a>

        <p className="text-xs text-gray-400 mt-4">Your report should include completed tasks, challenges, and next steps.</p>
      </div>
    </div>
  );
}

export default Email;
