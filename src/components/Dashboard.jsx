import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const Dashboard = () => {
  const { xp, level } = useContext(HabitContext);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Level: {level}</p>
      <p>XP: {xp}</p>
    </div>
  );
};

export default Dashboard;
