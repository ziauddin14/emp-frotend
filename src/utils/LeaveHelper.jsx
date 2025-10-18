import { useNavigate } from "react-router-dom";
import React from "react";
import { FaEye } from "react-icons/fa";

export const columns = [
  { name: "S.No", selector: (row) => row.sno, sortable: true, width: "80px" },
  { name: "Emp ID", selector: (row) => row.employeeId, sortable: true, width: "120px" },
  { name: "Name", selector: (row) => row.name, sortable: true, width: "150px" },
  { name: "Leave Type", selector: (row) => row.leaveType, sortable: true, width: "130px" },
  { name: "Department", selector: (row) => row.department, sortable: true, width: "150px" },
  { name: "Days", selector: (row) => row.days, sortable: true, width: "80px" },
  { 
    name: "Status", 
    selector: (row) => row.status, 
    sortable: true, 
    width: "120px",
    cell: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        row.status.toLowerCase() === 'approved' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
          : row.status.toLowerCase() === 'rejected'
          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      }`}>
        {row.status}
      </span>
    )
  },
  { name: "Action", selector: (row) => row.action, width: "100px" },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  return (
    <button
      className="btn btn-outline text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 hover:border-blue-300 px-3 py-1.5 text-sm font-medium flex items-center gap-1"
      onClick={() => handleView(Id)}
    >
      <FaEye />
      View
    </button>
  );
};
