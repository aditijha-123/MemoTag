import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container">
      <div>
        <Link to="/">Login</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <Link to="/user">User</Link>
      </div>
      <div>
        <Link to="/posts">CommonPosts</Link>
      </div>
      <div>
        <Link to="/admin">SuperAdmin</Link>
      </div>
      <main>
      <Outlet />
    </main>
    </div>
  );
};

export default Navbar;
