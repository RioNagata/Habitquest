// src/components/PreviousHabits.jsx
import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const PreviousHabits = () => {
  const { previousHabits, restartHabit } = useContext(HabitContext);

  return (
    <div>
      <h2>Previous Habits</h2>
      {previousHabits.length === 0 && <p>No previous habits yet.</p>}
      <ul>
        {previousHabits.map((habit) => (
          <li key={habit.id}>
            {habit.name} - {habit.status}
            <button onClick={() => restartHabit(habit.id)}>Restart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousHabits;
