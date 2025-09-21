// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HabitProvider } from "./context/HabitContext";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import PreviousHabits from "./components/PreviousHabits";
import Achievements from "./components/Achievements";
import Store from "./components/Store";
import Settings from "./components/Settings"; // 🔹 new settings page

import "./styles/App.css";

function App() {
  return (
    <HabitProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              {/* Home Page */}
              <Route
                path="/"
                element={
                  <>
                    <Dashboard />
                    <HabitForm />
                    <HabitList />
                    <PreviousHabits />
                    <Achievements />
                  </>
                }
              />

              {/* Rewards Store */}
              <Route path="/store" element={<Store />} />

              {/* Settings Page */}
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </HabitProvider>
  );
}

export default App;
