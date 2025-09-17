// src/components/HabitForm.jsx
import React, { useState, useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useContext(HabitContext);
  const [name, setName] = useState("");
  const [points, setPoints] = useState(10);
  const [period, setPeriod] = useState("daily");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    addHabit({ name, points: parseInt(points), period });

    // reset
    setName("");
    setPoints(10);
    setPeriod("daily");
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        min="1"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
      />
      <select value={period} onChange={(e) => setPeriod(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <button type="submit" className="btn btn-green">
        Add Habit
      </button>
    </form>
  );
};

export default HabitForm;
