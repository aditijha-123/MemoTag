import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedSuperAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    function decodeJwt() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/posts");
        }
        const parts = token.split(".");
        if (parts.length !== 3) {
          throw new Error("Invalid JWT format");
        }
        
        const payload = JSON.parse(atob(parts[1]));
        if(payload?.role !== "superadmin") navigate('/posts')
      } catch (error) {
        navigate("/posts");
      }
    }
    decodeJwt();
  }, []);
  return <Outlet />;
};

export default ProtectedSuperAdmin;
