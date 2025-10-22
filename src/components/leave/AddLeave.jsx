import React, { useState } from "react";
import { useAuth } from "../../context/authContex";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import { FaCalendarAlt, FaArrowLeft, FaSave, FaPlus } from "react-icons/fa";

const AddLeave = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [leave, setLeave] = useState({
    userId: user._id,
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handlChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`);
      } else {
        console.warn("Leave submission failed:", response.data);
        alert("Failed to submit leave request");
      }
    } catch (error) {
      console.error("Error submitting leave:", error);
      alert("An error occurred while submitting your leave request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container py-6">
      <div className="surface p-6 sm:p-8 max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/employee-dashboard/leaves/${user._id}`)}
              className="btn btn-outline flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FaArrowLeft />
              Back to Leaves
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <FaCalendarAlt className="text-blue-600" />
                Request Leave
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Submit a new leave request
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Leave Details
            </h3>
            
            <div className="space-y-4">
              {/* Leave Type */}
              <div>
                <label className="label text-gray-700 dark:text-gray-300">
                  Leave Type *
                </label>
                <select
                  name="leaveType"
                  onChange={handlChange}
                  value={leave.leaveType}
                  className="input"
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label text-gray-700 dark:text-gray-300">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    onChange={handlChange}
                    value={leave.startDate}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="label text-gray-700 dark:text-gray-300">
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    onChange={handlChange}
                    value={leave.endDate}
                    className="input"
                    required
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="label text-gray-700 dark:text-gray-300">
                  Reason/Description *
                </label>
                <textarea
                  name="reason"
                  placeholder="Please provide a detailed reason for your leave request..."
                  onChange={handlChange}
                  value={leave.reason}
                  className="input resize-none"
                  rows="4"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary flex items-center gap-2 px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-200"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner w-5 h-5"></div>
                  Submitting Request...
                </>
              ) : (
                <>
                  <FaSave />
                  Submit Leave Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeave;
