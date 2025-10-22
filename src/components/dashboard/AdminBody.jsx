import React, { useEffect, useState } from "react";
import BodyCards from "./BodyCards";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import axiosInstance from "../../axiosConfig";
const AdminBody = () => {
  const [body, setBody] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBody = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        const response = await axiosInstance.get("/dashboard/body", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Dashboard Data:", response.data);
        setBody(response.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        alert(error.response?.data?.error || "Server error");
      } finally {
        setLoading(false);
      }
    };
    fetchBody();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!body) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No Data Available</h3>
          <p className="text-gray-500 dark:text-gray-400">Unable to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Welcome back! Here's what's happening with your organization.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
        <BodyCards
          icons={<FaUsers />}
          text="Total Employees"
          number={body.totalEmployees}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          description="Active workforce"
        />
        <BodyCards
          icons={<FaBuilding />}
          text="Total Departments"
          number={body.totalDep}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          description="Organizational units"
        />
        <BodyCards
          icons={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={body.totalSalaries}
          color="bg-gradient-to-br from-green-500 to-green-600"
          description="Total payroll"
        />
      </div>

      {/* Leave Management Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Leave Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Track and manage employee leave requests
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <BodyCards
            icons={<FaFileAlt />}
            text="Leave Applied"
            number={body.leaveSummary.appliedFor}
            color="bg-gradient-to-br from-cyan-500 to-cyan-600"
            description="Total requests"
          />
          <BodyCards
            icons={<FaCheckCircle />}
            text="Leave Approved"
            number={body.leaveSummary.approved}
            color="bg-gradient-to-br from-emerald-500 to-emerald-600"
            description="Approved requests"
          />
          <BodyCards
            icons={<FaHourglassHalf />}
            text="Leave Pending"
            number={body.leaveSummary.pending}
            color="bg-gradient-to-br from-amber-500 to-amber-600"
            description="Awaiting review"
          />
          <BodyCards
            icons={<FaTimesCircle />}
            text="Leave Rejected"
            number={body.leaveSummary.rejected}
            color="bg-gradient-to-br from-red-500 to-red-600"
            description="Rejected requests"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminBody;
