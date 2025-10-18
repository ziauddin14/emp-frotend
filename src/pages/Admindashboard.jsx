import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContex";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Admindashboard = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark"); else root.classList.remove("dark");
  }, [isDark]);

  return (
    <div className="flex">
      <AdminSidebar collapsed={collapsed} />
      <div className={`main ${collapsed ? "collapsed" : ""}`}>
        <Navbar
          onToggleSidebar={() => setCollapsed((s) => !s)}
          isDark={isDark}
          onToggleTheme={() => setIsDark((d) => !d)}
        />
        <div key={location.pathname} className="page-enter-active" style={{ padding: 16 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;