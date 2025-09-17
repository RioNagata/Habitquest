// src/App.js
import React from "react";
import { HabitProvider } from "./context/HabitContext";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import PreviousHabits from "./components/PreviousHabits";
import Achievements from "./components/Achievements";
import Settings from "./components/Settings"; // ✅ Added

import "./styles/App.css";

function App() {
  return (
    <HabitProvider>
      <div className="App">
        <Navbar />   {/* Shows player level, XP, etc. */}
        <main>
          <Dashboard />        {/* Level, XP, completed habits */}
          <HabitForm />        {/* Form to add new habits */}
          <HabitList />        {/* Active habits with timer and actions */}
          <PreviousHabits />   {/* Completed or failed habits, can restart */}
          <Achievements />     {/* Unlocked badges / achievements */}
          <Settings />         {/* Reset achievements or hard reset everything */}
        </main>
      </div>
    </HabitProvider>
  );
}

export default App;
