import React from 'react';
import Navbar from './Navbar';

function Email() {
  const email = "harshchavda529@gmail.com";
  const subject = "EOD Report - [Your Name]";
  const body = `Hello,\n\nHere is my EOD (End of Day) report:\n\n- Tasks Completed: \n- Challenges Faced: \n- Plans for Tomorrow: \n\nBest Regards,\n[Your Name]`;

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg text-center w-full max-w-lg border border-gray-200">
        <h1 className="text-2xl font-extrabold mb-4 text-blue-600">📩 End of Day Report</h1>
        
        <p className="text-gray-600 mb-6">
         Please submit your <strong>EOD (End of Day) report</strong> with the tasks you completed today.  
        If your report includes any <strong>photos or files</strong>, please make sure to <strong>attach them</strong> in the email.  
        Click the button below to send your report.
        </p>


        <a
          href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 transform hover:scale-105 focus:ring-4 focus:ring-blue-300"
        >
          Send EOD Report 🚀
        </a>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-gray-700 text-sm border border-gray-300">
          ✨ EOD Format:  
          - Tasks Completed ✅  
          - Challenges Faced ⚠️  (Optional)
          - Plans for Tomorrow  📅 (Optional) 
        </div>
      </div>
    </div>
    </>
  );
}

export default Email;
