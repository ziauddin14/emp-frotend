import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBody from "./components/dashboard/AdminBody";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivetRoutes from "./utils/PrivetRoutes";
import ProtustedRoutes from "./utils/ProtustedRoutes";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartments from "./components/department/AddDepartments";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/Add";
import ViewSalary from "./components/salary/ViewSalary";
import BodyCard from "./components/employeeDashboard/BodyCard";
import Profile from "./components/employeeDashboard/Profile";
import LeaveList from "./components/leave/LeaveList";
import AddLeave from "./components/leave/AddLeave";
import Setting from "./components/employeeDashboard/Setting";
import Unauthorized from "./pages/Unauthorized";
import Table from "./components/leave/Table";
import LeaveDetails from "./components/leave/LeaveDetails";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      

      <Route
        path="/admin-dashboard"
        element={
          <PrivetRoutes>
            <ProtustedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </ProtustedRoutes>
          </PrivetRoutes>
        }
      >
        <Route index element={<AdminBody />} />
        <Route
          path="/admin-dashboard/departments"
          element={<DepartmentList />}
        />
        <Route
          path="/admin-dashboard/add-department"
          element={<AddDepartments />}
        />
        <Route
          path="/admin-dashboard/department/:id"
          element={<EditDepartment />}
        />
        <Route path="/admin-dashboard/employee" element={<List />} />
        <Route path="/admin-dashboard/add-employee" element={<Add />} />
        <Route path="/admin-dashboard/employee/:id" element={<View />} />
        <Route path="/admin-dashboard/employee/edit/:id" element={<Edit />} />
        <Route path="/admin-dashboard/salary/add" element={<AddSalary />} />
        <Route
          path="/admin-dashboard/salary/view/:id"
          element={<ViewSalary />}
        />
        <Route path="/admin-dashboard/leaves" element={<Table/>} />
        <Route path="/admin-dashboard/leaves/:id" element={<LeaveDetails/>} />
        <Route path="/admin-dashboard/employee/leaves/:id" element={<LeaveList/>} />
        <Route path="/admin-dashboard/setting" element={<Setting/>} />
      </Route>

      <Route
        path="/employee-dashboard"
        element={
          <PrivetRoutes>
            <ProtustedRoutes>
              <EmployeeDashboard requiredRole={["admin", "employee"]} />
            </ProtustedRoutes>
          </PrivetRoutes>
        }
      >
      <Route index element={<BodyCard />} />
      <Route path="/employee-dashboard/profile/:id" element={<Profile />} />
      <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />} />
      <Route path="/employee-dashboard/add-leave" element={<AddLeave />} />
      <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />} />
      <Route path="/employee-dashboard/setting" element={<Setting />} />
    </Route>
      
    </Routes>
  );
}

export default App;