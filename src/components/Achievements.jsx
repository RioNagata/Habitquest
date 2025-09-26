// src/components/Achievements.jsx
import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

export default function Achievements() {
  const { achievements, player } = useContext(HabitContext);

  const hasAchievements = achievements.length > 0;
  const hasBadges = player?.badges && player.badges.length > 0;

  if (!hasAchievements && !hasBadges) {
    return <p>No achievements or badges yet. Keep going!</p>;
  }

  return (
    <div className="achievements">
      <h2>Achievements & Badges 🏆</h2>
      <ul>
        {/* Achievements */}
        {achievements.map((ach) => (
          <li key={`ach-${ach.id}`} className="achievement">
            <span role="img" aria-label="achievement">🏅</span>{" "}
            <strong>{ach.name}</strong>
          </li>
        ))}

        {/* Purchased badges */}
        {hasBadges &&
          player.badges.map((badge, idx) => (
            <li key={`badge-${idx}`} className="badge">
              <span role="img" aria-label="badge">{badge}</span>{" "}
              <strong>Special Badge</strong>
            </li>
          ))}
      </ul>
    </div>
  );
}
