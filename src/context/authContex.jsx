import axios from "axios";
import React, { useEffect, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("http://localhost:4000/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            setUser(response.data.user);
          } 
        } else {
          setUser(null);
          setLoading(false)
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          setUser(null);
        }
        console.error("Error verifying user:", error);
      }finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [navigate]);

  return (
    <userContext.Provider value={{ user, login, logout , loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);
export default AuthContext;