import axios from "axios";
import { useNavigate } from "react-router-dom";
import react from "react";
export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:4000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    } else {
      console.warn("No success field found in response:", response.data);
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};
//employee for salary form----
export const getEmploye = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `http://localhost:4000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    } else {
      console.warn("No success field found in response:", response.data);
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};
import React from "react";

const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        className="btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-w-[60px]"
        onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
      >
        View
      </button>
      <button
        className="btn bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-3 py-2 text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-w-[60px]"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
      >
        Edit
      </button>
      <button
        className="btn bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-3 py-2 text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-w-[60px]"
        onClick={() => navigate(`/admin-dashboard/salary/view/${_id}`)}
      >
        Salary
      </button>
      <button
        className="btn bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-3 py-2 text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-w-[60px]"
        onClick={() => navigate(`/admin-dashboard/employee/leaves/${_id}`)}
      >
        Leave
      </button>
    </div>
  );
};
export default EmployeeButtons;

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Image",
    cell: (row) => (
      <img
        src={row.profileImage || "/default-profile.png"}
        alt={row.name}
        className="w-10 h-10 rounded-full object-cover"
        style={{ boxShadow: "0 6px 16px rgba(31,41,55,0.2)", border: "2px solid rgba(59,130,246,0.45)" }}
      />
    ),
    width: "80px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "160px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "170px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    width: "140px",
  },
  {
    name: "Action",
    selector: (row) => <EmployeeButtons _id={row._id} />,
    center: true,
  },
];
