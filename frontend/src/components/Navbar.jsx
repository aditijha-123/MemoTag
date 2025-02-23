import React from "react";
import { Link, Outlet } from "react-router-dom";
  

const Navbar = () => {
  return (
    <div>
      {/* Navbar Section */}
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/user">User</Link>
          <Link to="/posts">CommonPosts</Link>
          <Link to="/admin">SuperAdmin</Link>
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
