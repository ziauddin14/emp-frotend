import React from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import DepartmentButtons, { columns } from "./DepartmentHelper";
import { useState } from "react";
import axiosInstance from "../../axiosConfig";
import { FaBuilding, FaPlus, FaSearch, FaUsers } from "react-icons/fa";
const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filterDepartments, setFilterDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onDepartmentDelete = async (id) => {
    const data = departments.filter(dep => dep._id !== id);
    setDepartments(data);
    setFilterDepartments(data);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axiosInstance.get("/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            description: dep.description || "No description provided",
            action: <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>,
          }));

          setDepartments(data);
          setFilterDepartments(data);
        } else {
          console.warn("No success field found in response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filteredDepartments = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const records = departments.filter((dep) => {
      return dep.dep_name.toLowerCase().includes(searchValue.toLowerCase()) ||
             dep.description.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilterDepartments(records);
  };

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

  if (depLoading) {
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-3">
              <FaBuilding className="text-blue-600 dark:text-blue-400" />
              Manage Departments
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Organize your company structure with departments
            </p>
          </div>
          <Link 
            to="/admin-dashboard/add-department" 
            className="btn btn-primary flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          >
            <FaPlus />
            Add New Department
          </Link>
        </div>

        {/* Search Section */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10" />
            <input
              type="text"
              placeholder="Search departments..."
              className="input pl-10 pr-4 w-full"
              value={searchTerm}
              onChange={filteredDepartments}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {departments.length}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              Total Departments
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {filterDepartments.length}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 font-medium">
              Filtered Results
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              Active
            </div>
            <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
              All Departments
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <DataTable 
            columns={columns} 
            data={filterDepartments} 
            pagination 
            highlightOnHover 
            customStyles={tableStyles}
            noDataComponent={
              <div className="text-center py-12">
                <FaBuilding className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  No Departments Found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm ? "Try adjusting your search criteria" : "Add your first department to get started"}
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
