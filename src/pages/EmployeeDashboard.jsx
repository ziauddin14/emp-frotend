import React, { useEffect, useState } from 'react'
import EmpSidebar from '../components/employeeDashboard/EmpSidebar';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/dashboard/Navbar';

const EmployeeDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark"); else root.classList.remove("dark");
  }, [isDark]);

  return (
    <div className="flex">
      <EmpSidebar collapsed={collapsed} />
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
}

export default EmployeeDashboard