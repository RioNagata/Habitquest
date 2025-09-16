import React from "react";
import { HabitProvider } from "./context/HabitContext";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import HabitList from "./components/HabitList";
import HabitForm from "./components/HabitForm";
import "./styles/App.css";

function App() {
  return (
    <HabitProvider>
      <div className="App">
        <Navbar />
        <main>
          <Dashboard />
          <HabitForm />
          <HabitList />
        </main>
      </div>
    </HabitProvider>
  );
}

export default App;
