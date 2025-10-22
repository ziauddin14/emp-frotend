import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import { FaArrowLeft, FaUser, FaIdCard, FaCalendarAlt, FaVenusMars, FaBuilding, FaHeart, FaEnvelope, FaDollarSign, FaBriefcase } from "react-icons/fa";

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Employee ID from URL:", id);
    const fetchEmployee = async () => {
      try {
        const response = await axiosInstance.get(
          `/employee/single/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        } else {
          console.warn("Employee fetch failed:", response.data);
        }
      } catch (error) {
        console.error("Error fetching Employee:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!employee?.userId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Employee Not Found</h3>
          <p className="text-gray-500 dark:text-gray-500">The requested employee could not be found</p>
        </div>
      </div>
    );
  }

  const InfoCard = ({ icon: Icon, label, value, color = "blue" }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/20`}>
          <Icon className={`text-${color}-600 dark:text-${color}-400`} />
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {value || "N/A"}
      </p>
    </div>
  );

  return (
    <div className="app-container py-6">
      <div className="surface p-6 sm:p-8 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin-dashboard/employee")}
              className="btn btn-outline flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FaArrowLeft />
              Back to Employees
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <FaUser className="text-blue-600" />
                Employee Details
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Complete information about {employee?.userId?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={employee?.userId?.profileImage || "/default-profile.png"}
                alt="Employee Profile" 
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-600 mx-auto"
                onError={(e) => {
                  e.target.src = "/default-profile.png";
                }}
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-600 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            
            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {employee?.userId?.name}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                {employee?.designation}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-500">
                {employee?.department?.dep_name}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  {employee?.userId?.role || "Employee"}
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard 
            icon={FaIdCard} 
            label="Employee ID" 
            value={employee?.employeeId} 
            color="blue"
          />
          <InfoCard 
            icon={FaEnvelope} 
            label="Email" 
            value={employee?.userId?.email} 
            color="green"
          />
          <InfoCard 
            icon={FaCalendarAlt} 
            label="Date of Birth" 
            value={employee?.dob ? new Date(employee.dob).toLocaleDateString() : "N/A"} 
            color="purple"
          />
          <InfoCard 
            icon={FaVenusMars} 
            label="Gender" 
            value={employee?.gender} 
            color="pink"
          />
          <InfoCard 
            icon={FaHeart} 
            label="Marital Status" 
            value={employee?.maritalStatus} 
            color="red"
          />
          <InfoCard 
            icon={FaBuilding} 
            label="Department" 
            value={employee?.department?.dep_name} 
            color="indigo"
          />
          <InfoCard 
            icon={FaBriefcase} 
            label="Designation" 
            value={employee?.designation} 
            color="yellow"
          />
          <InfoCard 
            icon={FaDollarSign} 
            label="Salary" 
            value={employee?.salary ? `$${employee.salary.toLocaleString()}` : "N/A"} 
            color="green"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          <button
            onClick={() => navigate(`/admin-dashboard/employee/edit/${id}`)}
            className="btn bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Edit Employee
          </button>
          <button
            onClick={() => navigate(`/admin-dashboard/salary/view/${id}`)}
            className="btn bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            View Salary
          </button>
          <button
            onClick={() => navigate(`/admin-dashboard/employee/leaves/${id}`)}
            className="btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            View Leaves
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;