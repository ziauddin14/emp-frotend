import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUser, FaIdCard, FaCalendarAlt, FaVenusMars, FaBuilding, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Profile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/employee/single/${id}`,
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
      <div className="text-center py-12">
        <FaUser className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          Employee Not Found
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          The requested employee profile could not be found
        </p>
      </div>
    );
  }

  return (
    <div className="app-container py-6">
      <div className="surface p-6 sm:p-8 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <FaUser className="text-blue-600" />
            Employee Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete employee information and details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Image Section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 text-center">
              <div className="relative inline-block">
                <img
                  src={employee?.userId?.profileImage || "/default-profile.png"}
                  alt="Employee Profile" 
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-600 mx-auto"
                  onError={(e) => {
                    e.target.src = "/default-profile.png";
                  }}
                />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-600">
                  <FaUser className="text-white text-lg" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-2">
                {employee?.userId?.name || "N/A"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {employee?.employeeId || "N/A"}
              </p>
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Active Employee
              </div>
            </div>
          </div>

          {/* Employee Details Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Personal Information
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaIdCard className="text-gray-500 w-5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Employee ID</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {employee?.employeeId || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaUser className="text-gray-500 w-5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {employee?.userId?.name || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-gray-500 w-5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Date of Birth</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {employee?.dob ? new Date(employee.dob).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaVenusMars className="text-gray-500 w-5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Gender</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {employee?.gender || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Information */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Work Information
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaBuilding className="text-gray-500 w-5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Department</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {employee?.department?.dep_name || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaHeart className="text-gray-500 w-5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Marital Status</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {employee?.maritalStatus || "N/A"}
                      </p>
                    </div>
                  </div>
                  {employee?.email && (
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-gray-500 w-5" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {employee.email}
                        </p>
                      </div>
                    </div>
                  )}
                  {employee?.phone && (
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-gray-500 w-5" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {employee.phone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            {(employee?.address || employee?.emergencyContact) && (
              <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Additional Information
                  </h3>
      </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {employee?.address && (
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-gray-500 w-5 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {employee.address}
                        </p>
      </div>
      </div>
                  )}
                  {employee?.emergencyContact && (
                    <div className="flex items-start gap-3">
                      <FaPhone className="text-gray-500 w-5 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Contact</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {employee.emergencyContact}
        </p>
      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
