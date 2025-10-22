import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContex';
import axiosInstance from '../../axiosConfig';
import { FaCalendarAlt, FaPlus, FaSearch, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const LeaveList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();

  const fetchLeave = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchLeave();
    }
  }, [user]);

  // Filter leaves based on search term
  const filteredLeaves = leaves.filter(leave =>
    leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusCount = (status) => {
    return leaves.filter(leave => leave.status.toLowerCase() === status.toLowerCase()).length;
  };

  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'approved') {
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    } else if (statusLower === 'rejected') {
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    } else {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="app-container py-6">
      <div className="surface p-6 sm:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-3">
              <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
              My Leave Requests
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track and manage your leave requests
            </p>
          </div>
          {user.role === "employee" && (
            <Link 
              to="/employee-dashboard/add-leave" 
              className="btn btn-primary flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <FaPlus />
              Request Leave
            </Link>
          )}
        </div>

        {/* Search Section */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10" />
            <input
              type="text"
              placeholder="Search leave requests..."
              className="input pl-10 pr-4 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {leaves.length}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              Total Requests
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {getStatusCount("pending")}
            </div>
            <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
              Pending
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {getStatusCount("approved")}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 font-medium">
              Approved
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {getStatusCount("rejected")}
            </div>
            <div className="text-sm text-red-600 dark:text-red-400 font-medium">
              Rejected
            </div>
          </div>
        </div>

        {/* Leave Requests Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">
                  #
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">
                  Leave Type
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">
                  From Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">
                  To Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">
                  Description
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map((leave, index) => (
                  <tr key={leave._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                    <td className="py-4 px-4 text-gray-900 dark:text-gray-100 font-medium">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-gray-100">
                      {leave.leaveType}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-gray-100">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-gray-100">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400 max-w-xs truncate">
                      {leave.reason}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(leave.status || "Pending")}`}>
                        {leave.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <FaCalendarAlt className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      No Leave Requests Found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {searchTerm ? "Try adjusting your search criteria" : "You haven't submitted any leave requests yet"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveList;
