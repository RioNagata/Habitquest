// src/components/Achievements.jsx
import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

export default function Achievements() {
  const { achievements } = useContext(HabitContext);

  if (achievements.length === 0) return <p>No achievements yet. Keep going!</p>;

  return (
    <div className="achievements">
      <h2>Achievements 🏆</h2>
      <ul>
        {achievements.map((ach) => (
          <li key={ach.id} className="achievement">
            <span role="img" aria-label="medal">🏅</span> {ach.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
