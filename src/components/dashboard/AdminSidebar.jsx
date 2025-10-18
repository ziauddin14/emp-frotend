import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendar,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

const SidebarLink = ({ to, icon: Icon, children }) => (
  <div className="tooltip">
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `nav-link ${isActive ? "active" : ""}`
      }
    >
      <Icon className="text-lg" />
      <span className="label font-medium">{children}</span>
    </NavLink>
    <div className="tooltip-content">{children}</div>
  </div>
);

const AdminSidebar = ({ collapsed }) => {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <h3 className="font-bold text-xl text-gray-900 dark:text-white">
            Employee MS
          </h3>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="p-4 space-y-2">
        <SidebarLink to="/admin-dashboard" icon={FaTachometerAlt}>
          Dashboard
        </SidebarLink>
        <SidebarLink to="/admin-dashboard/employee" icon={FaUsers}>
          Employee
        </SidebarLink>
        <SidebarLink to="/admin-dashboard/departments" icon={FaBuilding}>
          Departments
        </SidebarLink>
        <SidebarLink to="/admin-dashboard/leaves" icon={FaCalendar}>
          Leave
        </SidebarLink>
        <SidebarLink to="/admin-dashboard/salary/add" icon={FaMoneyBillWave}>
          Salary
        </SidebarLink>
        <SidebarLink to="/admin-dashboard/setting" icon={FaCogs}>
          Setting
        </SidebarLink>
      </nav>
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Version 1.0.0
          </p>
        </div>
      </div>
      
      <style>{`
        .sidebar.collapsed .label { display: none; }
        .sidebar.collapsed .tooltip .tooltip-content { left: 100%; }
        .sidebar.collapsed .h-16 { height: 4rem; }
      `}</style>
    </aside>
  );
};

export default AdminSidebar;
