import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaDollarSign, FaArrowLeft, FaSearch, FaCalendarAlt, FaChartLine } from "react-icons/fa";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchSalaries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      if (error.response && !error.response.data.success) {
        alert("Failed to fetch salary data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const q = e.target.value.toLowerCase();
    setSearchTerm(q);
    const filteredRecords = salaries.filter((s) =>
      s.employeeId?.employeeId?.toLowerCase().includes(q)
    );
    setFilteredSalaries(filteredRecords);
  };

  const getTotalSalary = () => {
    return filteredSalaries.reduce((sum, salary) => sum + (salary.netSalary || 0), 0);
  };

  const getAverageSalary = () => {
    return filteredSalaries.length > 0 ? getTotalSalary() / filteredSalaries.length : 0;
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
                Salary History
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                View and track salary records
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee ID..."
              className="input pl-10"
              value={searchTerm}
              onChange={filterSalaries}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {filteredSalaries.length}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              Total Records
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${getTotalSalary().toLocaleString()}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 font-medium">
              Total Paid
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ${getAverageSalary().toLocaleString()}
            </div>
            <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
              Average Salary
            </div>
          </div>
        </div>

        {/* Salary Table */}
        <div className="overflow-x-auto">
          {filteredSalaries.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">
                    #
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">
                    Employee ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">
                    Basic Salary
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">
                    Allowances
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">
                    Deductions
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">
                    Net Salary
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">
                    Pay Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary, index) => (
                  <tr key={salary._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                    <td className="py-4 px-4 text-gray-900 dark:text-gray-100 font-medium">
                      {index + 1}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-gray-100">
                      {salary.employeeId?.employeeId || "N/A"}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-gray-100">
                      ${salary.basicSalary?.toLocaleString() || "0"}
                    </td>
                    <td className="py-4 px-4 text-green-600 dark:text-green-400">
                      ${salary.allowances?.toLocaleString() || "0"}
                    </td>
                    <td className="py-4 px-4 text-red-600 dark:text-red-400">
                      ${salary.deductions?.toLocaleString() || "0"}
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-gray-100 font-semibold">
                      ${salary.netSalary?.toLocaleString() || "0"}
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                      {salary.payDate ? new Date(salary.payDate).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <FaDollarSign className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No Salary Records Found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {searchTerm ? "Try adjusting your search criteria" : "No salary records have been added yet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSalary;
