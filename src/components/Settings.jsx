// src/components/Settings.jsx
import React, { useContext, useState } from "react";
import { HabitContext } from "../context/HabitContext";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Settings() {
  const {
    habits,
    previousHabits,
    player,
    achievements,
    resetAchievements,
    hardReset,
  } = useContext(HabitContext);

  const { user, updateUsername, updatePassword } = useContext(AuthContext);
  const { theme, changeTheme, resetTheme } = useContext(ThemeContext);

  const [hardConfirmText, setHardConfirmText] = useState("");
  const [message, setMessage] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetAchievements = () => {
    if (!window.confirm("Reset all achievements? This cannot be undone.")) return;
    resetAchievements();
    showMessage("Achievements reset.");
  };

  const handleHardReset = () => {
    if (hardConfirmText.trim() !== "RESET") {
      alert('Type "RESET" in the box to confirm a hard reset.');
      return;
    }
    if (!window.confirm("Are you ABSOLUTELY SURE? This will clear all data.")) return;
    hardReset();
    resetTheme(); // restore default theme
    setHardConfirmText("");
    showMessage("All data has been wiped (hard reset). Default theme restored.");
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
    showMessage("Exported data to JSON.");
  };

  const handleUsernameChange = () => {
    if (!newUsername.trim()) {
      showMessage("❌ Username cannot be empty.");
      return;
    }
    const success = updateUsername(newUsername.trim());
    if (success) {
      setNewUsername("");
      showMessage("✅ Username updated!");
    } else {
      showMessage("❌ Username already taken.");
    }
  };

  const handlePasswordChange = () => {
    if (!newPassword.trim() || newPassword.length < 6) {
      showMessage("❌ Password must be at least 6 characters.");
      return;
    }
    const success = updatePassword(oldPassword, newPassword.trim());
    if (success) {
      setOldPassword("");
      setNewPassword("");
      showMessage("✅ Password updated!");
    } else {
      showMessage("❌ Current password is incorrect.");
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
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
              <div className="profile-name">{user?.username || "Adventurer"}</div>
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

          {/* Reset Achievements */}
          <div className="setting-row">
            <div>
              <div className="setting-title">Reset Achievements</div>
              <div className="setting-desc">Clear unlocked achievements (keeps habits & player data).</div>
            </div>
            <div>
              <button className="btn" onClick={handleResetAchievements}>Reset</button>
            </div>
          </div>

          {/* Hard Reset */}
          <div className="setting-row">
            <div>
              <div className="setting-title">Hard Reset Everything</div>
              <div className="setting-desc">Removes habits, player stats, and achievements.</div>
              <div className="setting-desc small">Type <code>RESET</code> below and click Confirm.</div>
            </div>
            <div className="hard-reset-column">
              <input
                className="confirm-input"
                placeholder='Type "RESET"'
                value={hardConfirmText}
                onChange={(e) => setHardConfirmText(e.target.value)}
              />
              <button className="btn btn-red" onClick={handleHardReset}>Confirm</button>
            </div>
          </div>

          {/* Export Data */}
          <div className="setting-row">
            <div>
              <div className="setting-title">Export Data</div>
              <div className="setting-desc">Download your data as a JSON backup.</div>
            </div>
            <div>
              <button className="btn" onClick={exportData}>Export</button>
            </div>
          </div>

          <hr />

          {/* Theme Selector */}
          <h3>Appearance</h3>
          <div className="setting-row">
            <div>
              <div className="setting-title">Theme</div>
              <div className="setting-desc">Choose how the app looks.</div>
            </div>
            <div className="setting-form">
              <select
                className="input"
                value={theme}
                onChange={(e) => changeTheme(e.target.value)}
              >
                <option value="light">🌞 Light</option>
                <option value="dark">🌙 Dark</option>
                <option value="retro">🎮 Retro</option>
              </select>
            </div>
          </div>

          <hr />

          {/* Change Username */}
          <h3>Account Settings</h3>
          <div className="setting-row">
            <div>
              <div className="setting-title">Change Username</div>
              <div className="setting-desc">Update your display name.</div>
            </div>
            <div className="setting-form">
              <input
                type="text"
                className="input"
                placeholder="New username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button className="btn btn-small" onClick={handleUsernameChange}>
                Update
              </button>
            </div>
          </div>

          {/* Change Password */}
          <div className="setting-row">
            <div>
              <div className="setting-title">Change Password</div>
              <div className="setting-desc">Enter your current password and new password.</div>
            </div>
            <div className="setting-form">
              <input
                type="password"
                className="confirm-input"
                placeholder="Current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <input
                type="password"
                className="confirm-input"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button className="btn btn-small" onClick={handlePasswordChange}>
                Update
              </button>
            </div>
          </div>

          {/* Notice messages */}
          <div style={{ marginTop: 12 }}>
            {message && <div className="notice">{message}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
