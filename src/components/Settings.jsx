// src/components/Settings.jsx
import React, { useContext, useState } from "react";
import { HabitContext } from "../context/HabitContext";

export default function Settings() {
  const {
    habits,
    previousHabits,
    player,
    achievements,
    resetAchievements,
    hardReset
  } = useContext(HabitContext);

  const [hardConfirmText, setHardConfirmText] = useState("");
  const [message, setMessage] = useState("");

  const handleResetAchievements = () => {
    if (!window.confirm("Reset all achievements? This cannot be undone.")) return;
    resetAchievements();
    setMessage("Achievements reset.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleHardReset = () => {
    // extra safety: require typing RESET
    if (hardConfirmText.trim() !== "RESET") {
      alert('Type "RESET" in the box to confirm a hard reset.');
      return;
    }
    if (!window.confirm("Are you ABSOLUTELY SURE? This will clear all data.")) return;
    hardReset();
    setHardConfirmText("");
    setMessage("All data has been wiped (hard reset).");
    setTimeout(() => setMessage(""), 3000);
  };

  const exportData = () => {
    const data = {
      habits: JSON.parse(localStorage.getItem("habits") || "[]"),
      previousHabits: JSON.parse(localStorage.getItem("previousHabits") || "[]"),
      player: JSON.parse(localStorage.getItem("player") || "{}"),
      achievements: JSON.parse(localStorage.getItem("achievements") || "[]"),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `habitquest-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Exported data to JSON.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <section className="settings card">
      <div className="settings-grid">
        {/* Left column - player summary */}
        <div className="settings-card">
          <h3>Profile</h3>
          <div className="profile-row">
            <div className="profile-avatar small">
              <img src="/images/avatar.png" alt="avatar" />
            </div>
            <div className="profile-details">
              <div className="profile-name">Adventurer</div>
              <div>Level: <strong>{player?.level ?? 1}</strong></div>
              <div>XP: <strong>{player?.xp ?? 0}</strong></div>
              <div>Coins: <strong>{player?.coins ?? 0} 🪙</strong></div>
            </div>
          </div>

          <hr />

          <div className="meta">
            <div>Active habits: <strong>{habits?.length ?? 0}</strong></div>
            <div>Previous habits: <strong>{previousHabits?.length ?? 0}</strong></div>
            <div>Achievements unlocked: <strong>{achievements?.length ?? 0}</strong></div>
          </div>
        </div>

        {/* Right column - controls */}
        <div className="settings-card">
          <h3>Controls</h3>

          <div className="setting-row">
            <div>
              <div className="setting-title">Reset Achievements</div>
              <div className="setting-desc">Clear unlocked achievements (keeps habits & player data).</div>
            </div>
            <div>
              <button className="btn" onClick={handleResetAchievements}>Reset Achievements</button>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-title">Hard Reset Everything</div>
              <div className="setting-desc">Removes habits, previous habits, player XP/coins/level, and achievements.</div>
              <div className="setting-desc small">Type <code>RESET</code> below and click Confirm to enable.</div>
            </div>
            <div className="hard-reset-column">
              <input
                className="confirm-input"
                placeholder='Type "RESET"'
                value={hardConfirmText}
                onChange={(e) => setHardConfirmText(e.target.value)}
              />
              <button
                className="btn btn-red"
                onClick={handleHardReset}
              >
                Hard Reset
              </button>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-title">Export Data</div>
              <div className="setting-desc">Download a JSON backup of your habits, previous habits, player and achievements.</div>
            </div>
            <div>
              <button className="btn" onClick={exportData}>Export JSON</button>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            {message && <div className="notice">{message}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
