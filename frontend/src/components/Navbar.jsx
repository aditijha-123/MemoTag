import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };
  useEffect(() => {
    function decodeJwt() {
      try {
        const token = localStorage.getItem("token");

        if (
          !token &&
          window.location.pathname !== "/register" &&
          window.location.pathname !== "/"
        ) {
          navigate("/");
        }
        const parts = token.split(".");
        if (parts.length !== 3) {
          throw new Error("Invalid JWT format");
        }

        const payload = JSON.parse(atob(parts[1]));
        setUser(payload);
      } catch (error) {
        navigate("/");
      }
    }
    decodeJwt();
  }, [localStorage.getItem("token")]);
  return (
    <div>
      {/* Navbar Section */}

      <div className="navbar">
        <div className="navbar-links">
          {!user ? (
            <>
              <Link to="/">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            
           <>
           <button onClick={logout}>logout</button>
            <Link to = '/user' >CreatePost</Link>
           </>
          )}

          <Link to="/posts">CommonPosts</Link>
          {user && user.role == "superadmin" && (
            <Link to="/admin">SuperAdmin</Link>
          )}
        </div>
      </div>

      {/* Main Content Section */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
