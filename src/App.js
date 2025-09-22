// src/App.js
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HabitProvider } from "./context/HabitContext";
import { AuthProvider, AuthContext } from "./context/AuthContext"; // ✅ new import
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import PreviousHabits from "./components/PreviousHabits";
import Achievements from "./components/Achievements";
import Store from "./components/Store";
import Settings from "./components/Settings";
import Login from "./pages/login"; // ✅ new login page
import Register from "./pages/Register";

import "./styles/App.css";

// 🔹 Protected Route wrapper
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <HabitProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                {/* Login Page (Public) */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Home Page (Protected) */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <>
                        <Dashboard />
                        <HabitForm />
                        <HabitList />
                        <PreviousHabits />
                        <Achievements />
                      </>
                    </PrivateRoute>
                  }
                />

                {/* Rewards Store (Protected) */}
                <Route
                  path="/store"
                  element={
                    <PrivateRoute>
                      <Store />
                    </PrivateRoute>
                  }
                />

                {/* Settings Page (Protected) */}
                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <Settings />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </HabitProvider>
    </AuthProvider>
  );
}

export default App;
