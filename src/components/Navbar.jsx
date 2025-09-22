// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HabitContext } from "../context/HabitContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { player } = useContext(HabitContext);
  const { user, logout } = useContext(AuthContext);

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
        {user ? (
          <>
            <div className="user-info">
              <span className="username">👤 {user.username}</span>
              <button className="btn btn-red" onClick={logout}>
                Logout
              </button>
            </div>

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
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="btn btn-blue btn-small">
              Login
            </Link>
            <Link to="/register" className="btn btn-green btn-small">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
