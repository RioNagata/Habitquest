import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const Navbar = () => {
  const { xp, level } = useContext(HabitContext);

  // XP required for next level
  const xpForNextLevel = level * 100;
  const progress = Math.min((xp / xpForNextLevel) * 100, 100);

  return (
    <nav className="navbar">
      {/* Left side - Title */}
      <div className="navbar-left">
        <h1>HabitQuest</h1>
      </div>

      {/* Right side - Stats */}
      <div className="navbar-right">
        <div className="stats-text">
          <span>Level {level}</span>
          <span>{xp}/{xpForNextLevel} XP</span>
        </div>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
