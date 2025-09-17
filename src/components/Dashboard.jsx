import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const Dashboard = () => {
  const { player, habits } = useContext(HabitContext);

  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Level: {player.level}</p>
      <p>XP: {player.xp}</p>
      <p>Completed Habits: {completedCount}</p>
    </div>
  );
};

export default Dashboard;
