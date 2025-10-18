import react from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export const columns = [
  {  
    name: "S No",
    selector: (row) => row.sno,
    width: "80px",
    color: "blue",
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
    width: "200px",
    color: "blue",
  },
  {
    name: "Description",
    selector: (row) => row.description,
    wrap: true,
    style: {
      maxWidth: "300px",
    },
    color: "blue",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    width: "280px",
    right: true,
    wrap: true,
    color: "blue",
  },
];

import React from "react";
import { useNavigate } from "react-router-dom";

const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department? This action cannot be undone.")) {
      return;
    }
    
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/department/single?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.success) {
        onDepartmentDelete(id);
        alert("Department deleted successfully!");
      } else {
        console.warn("Department delete failed:", response.data);
        alert("Failed to delete department");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred while deleting the department");
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {/* <button
        className="btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-w-[70px] flex items-center justify-center gap-1"
        title="View Department"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        <FaEye />
        View
      </button> */}
      <button
        className="btn bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-3 py-2 text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-w-[70px] flex items-center justify-center gap-1"
        title="Edit Department"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        <FaEdit />
        Edit
      </button>
      <button
        className="btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-w-[70px] flex items-center justify-center gap-1"
        title="Delete Department"
        onClick={() => handleDelete(_id)}
      >
        <FaTrash />
        Delete
      </button>
    </div>
  );
};

export default DepartmentButtons;
