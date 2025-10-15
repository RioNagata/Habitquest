// src/components/Dashboard.jsx
import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { player } = useContext(HabitContext);
  const { user } = useContext(AuthContext); 
  
  // 📸 NEW LINE: Get the profile picture URL from the user object
  // If the user object or the URL is missing, it defaults to the static image.
  const profileImage = user?.profilePicUrl || "/images/avatar.png"; 

  const xpForNextLevel = player.level * 100;
  const progress = Math.min((player.xp / xpForNextLevel) * 100, 100);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="profile-avatar">
          {/* 📸 MODIFIED SRC: Use the dynamic profileImage */}
          <img
            src={profileImage} 
            alt="Player Avatar"
            className="avatar"
          />
        </div>
        <div className="player-info">
          <h2>{user ? user.username : "Guest"}</h2>
          <p>Level {player.level}</p>
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
  );
};

export default Dashboard;