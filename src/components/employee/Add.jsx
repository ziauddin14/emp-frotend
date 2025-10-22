import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHalper";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaArrowLeft, FaSave } from "react-icons/fa";
import axiosInstance from "../../axiosConfig";
const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target; 
    if (name == "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formDataObj = new FormData();

  Object.keys(formData).forEach((key) => {
    formDataObj.append(key, formData[key]);
  });

  try {
    const response = await axiosInstance.post(
      "/employee/add",
      formDataObj, 
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      navigate("/admin-dashboard/employee");
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app-container py-6">
      <div className="surface p-6 sm:p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin-dashboard/employee")}
              className="btn btn-outline flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FaArrowLeft />
              Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <FaUserPlus className="text-blue-600" />
                Add New Employee
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Fill in the employee details below
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Personal Information
                </h3>
                
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="label text-gray-700 dark:text-gray-300">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="label text-gray-700 dark:text-gray-300">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="john.doe@company.com"
                      className="input"
                      required
                    />
                  </div>

                  {/* Employee ID */}
                  <div>
                    <label htmlFor="employeeId" className="label text-gray-700 dark:text-gray-300">
                      Employee ID *
                    </label>
                    <input
                      id="employeeId"
                      type="text"
                      name="employeeId"
                      onChange={handleChange}
                      placeholder="EMP001"
                      className="input"
                      required
                    />
                  </div>

                  {/* DOB */}
                  <div>
                    <label htmlFor="dob" className="label text-gray-700 dark:text-gray-300">
                      Date of Birth *
                    </label>
                    <input
                      id="dob"
                      type="date"
                      name="dob"
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Work Information Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Work Information
                </h3>
                
                <div className="space-y-4">
                  {/* Department */}
                  <div>
                    <label htmlFor="department" className="label text-gray-700 dark:text-gray-300">
                      Department *
                    </label>
                    <select
                      id="department"
                      name="department"
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dep) => (
                        <option key={dep._id} value={dep._id}>
                          {dep.dep_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Designation */}
                  <div>
                    <label htmlFor="designation" className="label text-gray-700 dark:text-gray-300">
                      Designation *
                    </label>
                    <input
                      id="designation"
                      type="text"
                      name="designation"
                      onChange={handleChange}
                      placeholder="Software Engineer"
                      className="input"
                      required
                    />
                  </div>

                  {/* Salary */}
                  <div>
                    <label htmlFor="salary" className="label text-gray-700 dark:text-gray-300">
                      Salary *
                    </label>
                    <input
                      id="salary"
                      type="number"
                      name="salary"
                      onChange={handleChange}
                      placeholder="50000"
                      className="input"
                      required
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label htmlFor="role" className="label text-gray-700 dark:text-gray-300">
                      Role *
                    </label>
                    <select
                      id="role"
                      name="role"
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Additional Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Gender */}
                  <div>
                    <label htmlFor="gender" className="label text-gray-700 dark:text-gray-300">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Marital Status */}
                  <div>
                    <label htmlFor="maritalStatus" className="label text-gray-700 dark:text-gray-300">
                      Marital Status *
                    </label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                    </select>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="label text-gray-700 dark:text-gray-300">
                      Password *
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="Enter secure password"
                      className="input"
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label htmlFor="image" className="label text-gray-700 dark:text-gray-300">
                      Profile Image
                    </label>
                    <input
                      id="image"
                      type="file"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                      className="input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
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
                  Adding Employee...
                </>
              ) : (
                <>
                  <FaSave />
                  Add Employee
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;