import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPanel from "./components/UserPanel";
import SuperAdminPanel from "./components/SuperAdminPanel";
import CommonPanel from "./components/CommonPanel";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import ProtectedSuperAdmin from "./components/ProtectedSuperAdmin";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserPanel />} />
         <Route path="/" element={<ProtectedSuperAdmin />}>
          <Route path="/admin" element={<SuperAdminPanel />} />
        </Route>
        <Route path="/posts" element={<CommonPanel />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
