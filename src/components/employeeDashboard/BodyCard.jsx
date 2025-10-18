import React from "react";
import { FaUser, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useAuth } from "../../context/authContex";

const BodyCard = () => {
  const { user } = useAuth();
  
  return (
    <div className="app-container py-6">
      <div className="surface p-6 sm:p-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FaUser className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                Welcome Back!
              </h1>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {user?.name || "Employee"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Have a productive day ahead
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Total Leaves */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Leaves</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">This year</p>
          </div>

          {/* Pending Leaves */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <FaClock className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Pending</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Awaiting approval</p>
          </div>

          {/* Approved Leaves */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-green-600 dark:text-green-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">8</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Approved</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Successfully granted</p>
          </div>

          {/* Rejected Leaves */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <FaTimesCircle className="text-red-600 dark:text-red-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">1</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Rejected</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Not approved</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-green-600 dark:text-green-400 text-sm" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Leave request approved
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sick leave for 2 days - Approved by HR
                </p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">2 days ago</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <FaClock className="text-yellow-600 dark:text-yellow-400 text-sm" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Leave request submitted
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Annual leave for 5 days - Pending approval
                </p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyCard;
