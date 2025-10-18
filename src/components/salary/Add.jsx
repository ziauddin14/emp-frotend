import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchDepartments, getEmploye } from "../../utils/EmployeeHalper";
import { FaDollarSign, FaArrowLeft, FaSave, FaCalculator } from "react-icons/fa";

const AddSalary = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    department: "",
    employee: "",
    basicSalary: "",
    allowances: "",
    deduction: "",
    payDate: ""
  });
  const [departments, setDepartments] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  //  Fetch Departments
  useEffect(() => {
    const loadDepartments = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps);
    };
    loadDepartments();
  }, []);

  //  Fetch Employee by ID (if id present)
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/employee/single/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) setEmployee(res.data.employee);
      } catch (err) {
        console.error("Error fetching Employee:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  //  Handle Department Change
  const handleDepartment = async (e) => {
    const emps = await getEmploye(e.target.value);
    setEmployeesList(emps || []);
  };

  //  Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  //  Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // 🔹 Build the correct payload
    const salaryData = {
      employeeId: employee.employee, // 👈 convert "employee" → "employeeId"
      basicSalary: employee.basicSalary,
      allowances: employee.allowances,
      deductions: employee.deduction, // 👈 convert "deduction" → "deductions"
      payDate: employee.payDate,
    };

    console.log("📤 Salary Data Sent:", salaryData);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/salary/add",
        salaryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        alert("Salary added successfully!");
        navigate("/admin-dashboard/employee");
      }
    } catch (err) {
      console.error(" Salary Add Error:", err);
      alert("Failed to add salary");
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
                <FaDollarSign className="text-green-600" />
                Add Salary Record
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Create a new salary record for an employee
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Employee Selection Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Employee Selection
                </h3>
                
                <div className="space-y-4">
                  {/* Department */}
                  <div>
                    <label className="label text-gray-700 dark:text-gray-300">
                      Department *
                    </label>
                    <select
                      name="department"
                      onChange={handleDepartment}
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

                  {/* Employee */}
                  <div>
                    <label className="label text-gray-700 dark:text-gray-300">
                      Employee *
                    </label>
                    <select
                      name="employee"
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="">Select Employee</option>
                      {employeesList.map((emp) => (
                        <option key={emp._id} value={emp._id}>
                          {emp.name} ({emp.employeeId})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Salary Details Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Salary Details
                </h3>
                
                <div className="space-y-4">
                  {/* Basic Salary */}
                  <div>
                    <label className="label text-gray-700 dark:text-gray-300">
                      Basic Salary *
                    </label>
                    <input
                      type="number"
                      name="basicSalary"
                      onChange={handleChange}
                      placeholder="Enter basic salary amount"
                      className="input"
                      required
                    />
                  </div>

                  {/* Allowances */}
                  <div>
                    <label className="label text-gray-700 dark:text-gray-300">
                      Allowances
                    </label>
                    <input
                      type="number"
                      name="allowances"
                      onChange={handleChange}
                      placeholder="Enter allowances amount"
                      className="input"
                    />
                  </div>

                  {/* Deductions */}
                  <div>
                    <label className="label text-gray-700 dark:text-gray-300">
                      Deductions
                    </label>
                    <input
                      type="number"
                      name="deduction"
                      onChange={handleChange}
                      placeholder="Enter deductions amount"
                      className="input"
                    />
                  </div>

                  {/* Pay Date */}
                  <div>
                    <label className="label text-gray-700 dark:text-gray-300">
                      Pay Date *
                    </label>
                    <input
                      type="date"
                      name="payDate"
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Salary Summary */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FaCalculator className="text-green-600" />
              Salary Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${employee.basicSalary || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Basic Salary</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${employee.allowances || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Allowances</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  ${employee.deduction || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Deductions</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                ${(parseFloat(employee.basicSalary || 0) + parseFloat(employee.allowances || 0) - parseFloat(employee.deduction || 0)).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Net Salary</div>
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
                  Adding Salary...
                </>
              ) : (
                <>
                  <FaSave />
                  Add Salary Record
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSalary;
