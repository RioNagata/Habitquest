import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const Achievements = () => {
  const { achievements, resetAchievements } = useContext(HabitContext);

  return (
    <div>
      <h2>Achievements / Badges</h2>
      {achievements.length === 0 && <p>No achievements yet.</p>}
      <ul>
        {achievements.map((ach) => (
          <li key={ach.id}>🏅 {ach.name}</li>
        ))}
      </ul>
      {achievements.length > 0 && (
        <button onClick={resetAchievements}>Reset Achievements</button>
      )}
    </div>
  );
};

export default Achievements;
