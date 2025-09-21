// src/components/Dashboard.jsx
import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const Dashboard = () => {
  const { player } = useContext(HabitContext);

  const xpForNextLevel = player.level * 100;
  const progress = Math.min((player.xp / xpForNextLevel) * 100, 100);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="profile-avatar">
          <img
            src="/images/avatar.png" // ✅ put an avatar image in /public/images/avatar.png
            alt="Player Avatar"
            className="avatar"
          />
        </div>
        <div className="player-info">
          <h2>Adventurer</h2>
          <p>Level {player.level}</p>
          <p>{player.xp}/{xpForNextLevel} XP</p>
          <p>Coins: {player.coins} 🪙</p>
        </div>
      </div>

      <div className="xp-bar">
        <div className="xp-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default Dashboard;
