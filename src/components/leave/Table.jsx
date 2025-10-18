import React, { useEffect, useState } from "react";
import axios from "axios";
import { LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";
import { FaCalendarAlt, FaSearch, FaFilter, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFiltereLeves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        const data = response.data.leaves.map((leave, index) => ({
          sno: index + 1,
          employeeId: leave.employeeId?.employeeId || "N/A",
          name: leave.employeeId?.userId?.name || "N/A",
          leaveType: leave.leaveType || "N/A",
          department: leave.employeeId?.department?.dep_name || "N/A",
          days:
            Math.abs(
              Math.floor(
                (new Date(leave.endDate) - new Date(leave.startDate)) /
                  (1000 * 60 * 60 * 24)
              )
            ) + 1,
          status: leave.status || "Pending",
          action: <LeaveButtons Id={leave._id} />,
        }));

        console.log("Leaves API Data:", response.data.leaves);

        setLeaves(data);
        setFiltereLeves(data);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(searchValue) ||
      leave.name.toLowerCase().includes(searchValue) ||
      leave.department.toLowerCase().includes(searchValue)
    );
    setFiltereLeves(data);
  };

  const filterByButton = (status) => {
    setStatusFilter(status);
    if (status === "all") {
      setFiltereLeves(leaves);
    } else {
      const data = leaves.filter((leave) =>
        leave.status.toLowerCase().includes(status.toLowerCase())
      );
      setFiltereLeves(data);
    }
  };

  const getStatusCount = (status) => {
    return leaves.filter(leave => leave.status.toLowerCase() === status.toLowerCase()).length;
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <FaCalendarAlt className="text-blue-600" />
            Leave Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and manage employee leave requests
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {leaves.length}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              Total Requests
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {getStatusCount("pending")}
            </div>
            <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
              Pending
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {getStatusCount("approved")}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 font-medium">
              Approved
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {getStatusCount("rejected")}
            </div>
            <div className="text-sm text-red-600 dark:text-red-400 font-medium">
              Rejected
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name, ID, or department..."
              className="input pl-10"
              value={searchTerm}
              onChange={filterByInput}
            />
          </div>
          <div className="flex gap-2">
            <button 
              className={`btn flex items-center gap-2 ${statusFilter === "all" ? "btn-primary" : "btn-outline"}`}
              onClick={() => filterByButton("all")}
            >
              <FaFilter />
              All
            </button>
            <button 
              className={`btn flex items-center gap-2 ${statusFilter === "pending" ? "btn-primary" : "btn-outline"}`}
              onClick={() => filterByButton("pending")}
            >
              <FaClock />
              Pending
            </button>
            <button 
              className={`btn flex items-center gap-2 ${statusFilter === "approved" ? "btn-primary" : "btn-outline"}`}
              onClick={() => filterByButton("approved")}
            >
              <FaCheckCircle />
              Approved
            </button>
            <button 
              className={`btn flex items-center gap-2 ${statusFilter === "rejected" ? "btn-primary" : "btn-outline"}`}
              onClick={() => filterByButton("rejected")}
            >
              <FaTimesCircle />
              Rejected
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <DataTable 
            columns={columns} 
            data={filteredLeaves} 
            pagination 
            highlightOnHover 
            customStyles={tableStyles}
            noDataComponent={
              <div className="text-center py-12">
                <FaCalendarAlt className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No Leave Requests Found
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  {searchTerm || statusFilter !== "all" ? "Try adjusting your search criteria" : "No leave requests have been submitted yet"}
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
