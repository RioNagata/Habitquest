// src/components/Settings.jsx
import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

export default function Settings() {
  const { resetAchievements, hardReset } = useContext(HabitContext);

  const handleResetAchievements = () => {
    if (window.confirm("Are you sure you want to reset all achievements?")) {
      resetAchievements();
    }
  };

  const handleHardReset = () => {
    if (window.confirm("Are you sure you want to reset EVERYTHING?")) {
      hardReset();
      alert("All data has been reset!");
    }
  };

  return (
    <div className="settings">
      <h2>Settings ⚙️</h2>
      <button onClick={handleResetAchievements} className="btn">
        Reset Achievements
      </button>
      <button onClick={handleHardReset} className="btn btn-red">
        Hard Reset Everything
      </button>
    </div>
  );
}
