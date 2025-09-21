// src/components/PreviousHabits.jsx
import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const PreviousHabits = () => {
  const { previousHabits, restartHabit } = useContext(HabitContext);

  return (
    <div className="previous-habits">
      <h3>🏆 Previous Habits</h3>
      {previousHabits.length === 0 ? (
        <p className="no-habits">No previous habits yet.</p>
      ) : (
        <div className="habit-list">
          {previousHabits.map((habit) => (
            <div
              key={habit.id}
              className={`previous-habit-card ${habit.status === "completed" ? "completed" : "failed"}`}
            >
              {/* Left side - Habit info */}
              <div className="habit-info">
                <h4>{habit.name}</h4>
                <p className="habit-meta">
                  ⏳ {habit.duration || "N/A"} days • ⭐ {habit.points || 0} pts
                </p>
                <span className={`habit-status ${habit.status}`}>
                  {habit.status.toUpperCase()}
                </span>
              </div>

              {/* Right side - Restart button */}
              <button className="btn btn-restart" onClick={() => restartHabit(habit.id)}>
                🔄 Restart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousHabits;
