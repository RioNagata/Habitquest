// src/components/PreviousHabits.jsx
import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const PreviousHabits = () => {
  const { previousHabits, restartHabit } = useContext(HabitContext);

  return (
    <div className="previous-habits">
      <h3>Previous Habits</h3>
      {previousHabits.length === 0 ? (
        <p className="no-habits">No previous habits yet.</p>
      ) : (
        <div className="habit-list">
          {previousHabits.map((habit) => (
            <div
              key={habit.id}
              className={`previous-habit-card ${habit.status === "completed" ? "completed" : "failed"}`}
            >
              <div className="habit-info">
                <span>{habit.name}</span>
                <span className="habit-frequency">({habit.status})</span>
              </div>
              <button className="btn" onClick={() => restartHabit(habit.id)}>
                Restart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousHabits;
