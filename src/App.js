// src/App.js
import React from "react";
import { HabitProvider } from "./context/HabitContext";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import PreviousHabits from "./components/PreviousHabits";
import Achievements from "./components/Achievements";

import "./styles/App.css";

function App() {
  return (
    <HabitProvider>
      <div className="App">
        <Navbar />
        <main>
          <Dashboard />        {/* Shows level, XP, completed habits */}
          <HabitForm />        {/* Form to add new habits */}
          <HabitList />        {/* Active habits with timer and actions */}
          <PreviousHabits /> 
          <Achievements />    {/* Completed or failed habits to restart */}
        </main>
      </div>
    </HabitProvider>
  );
}

export default App;
