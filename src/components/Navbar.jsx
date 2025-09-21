// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom"; // ✅ for navigation
import { HabitContext } from "../context/HabitContext"; // ✅ import context

const Navbar = () => {
  const { player } = useContext(HabitContext);

  const xpForNextLevel = player.level * 100;
  const progress = Math.min((player.xp / xpForNextLevel) * 100, 100);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>HabitQuest</h1>
        <Link to="/">Dashboard</Link>
        <Link to="/store">Store</Link>
        <Link to="/settings">Settings</Link>
      </div>
      <div className="navbar-right">
        <div className="stats-text">
          <span>Level {player.level}</span>
          <span>
            {player.xp}/{xpForNextLevel} XP
          </span>
          <span>Coins: {player.coins} 🪙</span>
        </div>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; // ✅ export default
