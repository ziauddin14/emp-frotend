import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Unauthorized Access 🚫
      </h1>
      <p className="text-gray-700 mb-6">
        Aapko is page par access nahi hai.
      </p>
      <Link
        to="/employee-dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        Go Back to Dashboard 
      </Link>
    </div>
  );
};

export default Unauthorized;
