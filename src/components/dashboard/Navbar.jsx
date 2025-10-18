import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContex";
import { FaBell, FaMoon, FaSun, FaChevronDown, FaBars, FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ onToggleSidebar, isDark, onToggleTheme }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onWindowClick = (e) => {
      if (!e.target.closest?.(".dropdown")) setOpen(false);
    };
    window.addEventListener("click", onWindowClick);
    return () => window.removeEventListener("click", onWindowClick);
  }, []);

  return (
    <header className="header flex items-center justify-between px-4 sm:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button 
          aria-label="Toggle sidebar" 
          className="icon-btn hover:bg-blue-100 dark:hover:bg-gray-700" 
          onClick={onToggleSidebar}
        >
          <FaBars className="text-gray-600 dark:text-gray-300" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <strong className="text-gray-900 dark:text-white font-semibold">EMS</strong>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button 
          aria-label="Toggle theme" 
          className="icon-btn hover:bg-blue-100 dark:hover:bg-gray-700" 
          onClick={onToggleTheme}
        >
          {isDark ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-gray-600 dark:text-gray-300" />
          )}
        </button>
        
        {/* Notifications */}
        <button 
          aria-label="Notifications" 
          className="icon-btn hover:bg-blue-100 dark:hover:bg-gray-700 relative"
        >
          <FaBell className="text-gray-600 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* User Dropdown */}
        <div className={`dropdown ${open ? "open" : ""}`}>          
          <button 
            className="btn btn-outline hover:bg-blue-50 dark:hover:bg-gray-700" 
            onClick={() => setOpen((s) => !s)}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <span className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-gray-700 dark:text-gray-300 font-medium">
                {user?.name ?? "User"}
              </span>
              <FaChevronDown className="text-gray-500 text-xs" />
            </div>
          </button>
          
          <div className="dropdown-menu min-w-[220px]">
            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-600">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Signed in as</div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">
                {user?.email ?? "user@example.com"}
              </div>
            </div>
            
            <div className="p-2">
              <button 
                className="w-full btn bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300" 
                onClick={logout}
              >
                <FaSignOutAlt /> 
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
