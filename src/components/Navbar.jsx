import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const Navbar = () => {
  const { player } = useContext(HabitContext);

  const xpForNextLevel = player.level * 100;
  const progress = Math.min((player.xp / xpForNextLevel) * 100, 100);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>HabitQuest</h1>
      </div>
      <div className="navbar-right">
        <div className="stats-text">
          <span>Level {player.level}</span>
          <span>{player.xp}/{xpForNextLevel} XP</span>
          <span>Coins: {player.coins} 🪙</span>
        </div>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
