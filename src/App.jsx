import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import UserProfile from "./components/UserProfile";
import Dashboard from "./pages/Dashboard";

function App() {
  // Central users state
  const [users, setUsers] = useState(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    return Array.isArray(storedUsers) ? storedUsers : [];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<UserList users={users} />} />
          <Route
            path="/dashboard"
            element={<Dashboard users={users} setUsers={setUsers} />}
          />
          <Route
            path="/add"
            element={<AddUser users={users} setUsers={setUsers} />}
          />
          <Route path="/profile/:id" element={<UserProfile />} />

          {/* Redirect any unknown paths to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
