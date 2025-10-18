import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import EmployeeButtons, { columns } from "../../utils/EmployeeHalper";
import axios from "axios";
import { FaSearch, FaPlus, FaUsers } from "react-icons/fa";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setEmploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      setEmploading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || "N/A",
            name: emp.userId?.name || "Unknown User",
            dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
            profileImage: emp.userId?.profileImage || "",
            action: <EmployeeButtons id={emp._id} />,
          }));

          setEmployees(data);
        } else {
          console.warn("No success field found in response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmploading(false);
      }
    };

    fetchEmployee();
  }, []);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(emp =>
    emp.dep_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableStyles = {
    table: { style: { background: "transparent" } },
    headRow: { 
      style: { 
        background: "transparent", 
        borderBottom: "2px solid rgba(148,163,184,0.2)",
        borderRadius: "12px 12px 0 0"
      } 
    },
    headCells: { 
      style: { 
        color: "var(--color-muted)", 
        fontWeight: 700, 
        fontSize: "14px",
        textTransform: "uppercase",
        letterSpacing: "0.5px"
      } 
    },
    rows: {
      style: {
        background: "var(--color-surface)",
        boxShadow: "var(--shadow-soft)",
        borderRadius: 12,
        margin: "8px 0",
        minHeight: 64,
        border: "1px solid rgba(148,163,184,0.1)",
      },
      highlightOnHoverStyle: {
        backgroundColor: "rgba(59,130,246,0.06)",
        transform: "translateY(-2px)",
        boxShadow: "0 8px 25px rgba(59,130,246,0.15)",
      },
    },
    pagination: { 
      style: { 
        background: "transparent",
        borderTop: "1px solid rgba(148,163,184,0.1)",
        paddingTop: "16px"
      } 
    },
  };

  return (
    <div className="app-container py-6">
      <div className="surface p-6 sm:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-3">
              <FaUsers className="text-blue-600 dark:text-blue-400" />
              Manage Employees
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              View and manage all employee information
            </p>
          </div>
          <Link 
            to="/admin-dashboard/add-employee" 
            className="btn btn-primary flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          >
            <FaPlus />
            Add New Employee
          </Link>
        </div>

        {/* Search Section */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10" />
            <input
              type="text"
              placeholder="Search by name or department..."
              className="input pl-10 pr-4 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {employees.length}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              Total Employees
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {new Set(employees.map(emp => emp.dep_name)).size}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 font-medium">
              Departments
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {filteredEmployees.length}
            </div>
            <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
              Filtered Results
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <DataTable 
            columns={columns} 
            data={filteredEmployees} 
            progressPending={loading} 
            highlightOnHover 
            pagination 
            customStyles={tableStyles}
            noDataComponent={
              <div className="text-center py-12">
                <FaUsers className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  No Employees Found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm ? "Try adjusting your search criteria" : "Add your first employee to get started"}
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default List;
