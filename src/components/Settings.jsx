// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HabitContext } from "../context/HabitContext";
import "../styles/App.css"; // ✅ we'll style it separately

const Navbar = () => {
  const { player } = useContext(HabitContext);

  const xpForNextLevel = player.level * 100;
  const progress = Math.min((player.xp / xpForNextLevel) * 100, 100);

  return (
    <nav className="navbar">
      {/* Left side - Logo & Links */}
      <div className="navbar-left">
        <h1 className="logo">HabitQuest ⚔️</h1>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/store">Store</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </div>

      {/* Right side - Profile & Stats */}
      <div className="navbar-right">
        <div className="profile">
          <img
            src="/images/avatar.png"
            alt="Player Avatar"
            className="avatar"
          />
          <div className="stats">
            <p className="level">Level {player.level}</p>
            <p>
              {player.xp}/{xpForNextLevel} XP
            </p>
            <p>Coins: {player.coins} 🪙</p>
          </div>
        </div>

        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
