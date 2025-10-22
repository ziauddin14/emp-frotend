import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import { FaCalendarAlt, FaArrowLeft, FaUser, FaIdCard, FaBuilding, FaClock, FaCheckCircle, FaTimesCircle, FaFileAlt } from "react-icons/fa";

const LeaveDetails = () => {
  const { id } = useParams();
  const [leaves, setLeaves] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Employee ID from URL:", id);
    const fetchLeave = async () => {
      try {
        const response = await axiosInstance.get(
          `/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);

        if (response.data.success) {
          setLeaves(response.data.leave);
        } else {
          console.warn("Leave fetch failed:", response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeave();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!leaves?.employeeId?.userId) {
    return (
      <div className="text-center py-12">
        <FaCalendarAlt className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          Leave Request Not Found
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          The requested leave details could not be found
        </p>
      </div>
    );
  }

  const changeStatus = async (id, status) => {
    setUpdating(true);
    try {
      const response = await axiosInstance.put(
        `/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      } else {
        console.warn("Leave update failed:", response.data);
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      "Pending": { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-800 dark:text-yellow-300", icon: FaClock },
      "Approved": { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-800 dark:text-green-300", icon: FaCheckCircle },
      "Rejected": { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-800 dark:text-red-300", icon: FaTimesCircle }
    };
    
    const config = statusConfig[status] || statusConfig["Pending"];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="w-4 h-4" />
        {status}
      </span>
    );
  };

  return (
    <div className="app-container py-6">
      <div className="surface p-6 sm:p-8 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin-dashboard/leaves")}
              className="btn btn-outline flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FaArrowLeft />
              Back to Leaves
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <FaCalendarAlt className="text-blue-600" />
                Leave Request Details
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Review and manage leave request
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Employee Information */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-2xl text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {leaves.employeeId?.userId?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {leaves?.employeeId?.employeeId}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaBuilding className="text-gray-500 w-4" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {leaves.employeeId?.department?.dep_name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaIdCard className="text-gray-500 w-4" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {leaves?.employeeId?.employeeId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Details */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Leave Information */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Leave Information
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaFileAlt className="text-gray-500 w-5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Leave Type</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {leaves.leaveType || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-gray-500 w-5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Start Date</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {leaves.startDate ? new Date(leaves.startDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-gray-500 w-5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">End Date</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {leaves.endDate ? new Date(leaves.endDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Status & Actions
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Status</p>
                    {getStatusBadge(leaves.status)}
                  </div>
                  
                  {leaves.status === "Pending" && (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Actions</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                          className="btn bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center justify-center gap-2 flex-1"
                          onClick={() => changeStatus(leaves._id, "Approved")}
                          disabled={updating}
                        >
                          {updating ? (
                            <div className="spinner-small"></div>
                          ) : (
                            <FaCheckCircle />
                          )}
                          Approve
                        </button>
                        <button 
                          className="btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center justify-center gap-2 flex-1"
                          onClick={() => changeStatus(leaves._id, "Rejected")}
                          disabled={updating}
                        >
                          {updating ? (
                            <div className="spinner-small"></div>
                          ) : (
                            <FaTimesCircle />
                          )}
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reason Section */}
            {leaves.reason && (
              <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Reason for Leave
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {leaves.reason}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetails;
