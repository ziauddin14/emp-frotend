import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaBuilding, FaArrowLeft, FaSave, FaEdit } from "react-icons/fa";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const [depLoading, setDepLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/department/single?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.success) {
          setDepartment(response.data.department);
        } else {
          console.warn("Department fetch failed:", response.data);
        }
      } catch (error) {
        console.error("Error fetching department:", error);
        if (error.response?.data?.error) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await axios.put(
        `http://localhost:4000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Department updated successfully!");
        navigate('/admin-dashboard/departments');
      } else {
        alert("Update failed!");
      }
    } catch (error) {
      console.error("Error updating department:", error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (depLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="app-container py-6">
      <div className="surface p-6 sm:p-8 max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin-dashboard/departments")}
              className="btn btn-outline flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FaArrowLeft />
              Back to Departments
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <FaEdit className="text-blue-600" />
                Edit Department
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Update department information
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Department Information
            </h3>
            
            <div className="space-y-4">
              {/* Department Name */}
              <div>
                <label htmlFor="dep_name" className="label text-gray-700 dark:text-gray-300">
                  Department Name *
                </label>
                <input
                  type="text"
                  name="dep_name"
                  id="dep_name"
                  onChange={handleChange}
                  value={department?.dep_name || ""}
                  placeholder="Enter Department Name"
                  className="input"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="label text-gray-700 dark:text-gray-300">
                  Description *
                </label>
                <textarea
                  name="description"
                  id="description"
                  onChange={handleChange}
                  value={department?.description || ""}
                  placeholder="Describe the department's role and responsibilities..."
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
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div className="spinner w-5 h-5"></div>
                  Updating Department...
                </>
              ) : (
                <>
                  <FaSave />
                  Update Department
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
