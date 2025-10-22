import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHalper";
import { FaEdit, FaArrowLeft, FaSave, FaUser } from "react-icons/fa";
import axiosInstance from "../../axiosConfig";
const Edit = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axiosInstance.get(
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

 const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image") {
    setEmployee((prev) => ({ ...prev, [name]: files[0] }));
  } else if (name === "department") {
    
    setEmployee((prev) => ({
      ...prev,
      department: { _id: value },
    }));
  } else if (name === "name") {
    // ye userId ke andar hai
    setEmployee((prev) => ({
      ...prev,
      userId: { ...prev.userId, name: value },
    }));
  } else {
    setEmployee((prev) => ({ ...prev, [name]: value }));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axiosInstance.put(
        `/employee/update/${id}`,
        employee,
        {
          headers: {
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
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!employee) {
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
                <FaEdit className="text-blue-600" />
                Edit Employee
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Update information for {employee?.userId?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Personal Information
                </h3>
                
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="label text-gray-700 dark:text-gray-300" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={employee.userId?.name || ""}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>

                  {/* Marital Status */}
                  <div>
                    <label className="label text-gray-700 dark:text-gray-300" htmlFor="maritalStatus">
                      Marital Status *
                    </label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      value={employee.maritalStatus || ""}
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Information Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Work Information
                </h3>
                
                <div className="space-y-4">
                  {/* Designation */}
                  <div>
                    <label className="label text-gray-700 dark:text-gray-300" htmlFor="designation">
                      Designation *
                    </label>
                    <input
                      id="designation"
                      type="text"
                      name="designation"
                      value={employee.designation || ""}
                      onChange={handleChange}
                      placeholder="Software Engineer"
                      className="input"
                      required
                    />
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="label text-gray-700 dark:text-gray-300" htmlFor="salary">
                      Salary *
                    </label>
                    <input
                      id="salary"
                      type="number"
                      name="salary"
                      value={employee.salary || ""}
                      onChange={handleChange}
                      placeholder="50000"
                      className="input"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Department Section */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Department Assignment
                </h3>
                
                <div>
                  <label className="label text-gray-700 dark:text-gray-300" htmlFor="department">
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={employee.department?._id || ""}
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
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary flex items-center gap-2 px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-200"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div className="spinner w-5 h-5"></div>
                  Updating Employee...
                </>
              ) : (
                <>
                  <FaSave />
                  Update Employee
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
