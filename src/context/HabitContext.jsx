// src/context/HabitContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext"; // ✅ import auth

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If no user, return defaults
  const defaultData = {
    habits: [],
    previousHabits: [],
    player: { xp: 0, level: 1, coins: 0 },
    achievements: [],
  };

  // Load all users’ data from localStorage
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("habitquest-data");
    return saved ? JSON.parse(saved) : {};
  });

  // Get current user's data (or default if first time)
  const currentData = user ? userData[user.username] || defaultData : defaultData;

  // Utility: save back to localStorage
  const updateUserData = (updater) => {
    if (!user) return; // no user logged in
    setUserData((prev) => {
      const updated = {
        ...prev,
        [user.username]: updater(prev[user.username] || defaultData),
      };
      localStorage.setItem("habitquest-data", JSON.stringify(updated));
      return updated;
    });
  };

  // -------------------
  // ✅ State Setters
  // -------------------
  const setPlayer = (updater) => {
    updateUserData((prev) => ({
      ...prev,
      player: typeof updater === "function" ? updater(prev.player) : updater,
    }));
  };

  const setHabits = (updater) => {
    updateUserData((prev) => ({
      ...prev,
      habits: typeof updater === "function" ? updater(prev.habits) : updater,
    }));
  };

  const setPreviousHabits = (updater) => {
    updateUserData((prev) => ({
      ...prev,
      previousHabits: typeof updater === "function" ? updater(prev.previousHabits) : updater,
    }));
  };

  const setAchievements = (updater) => {
    updateUserData((prev) => ({
      ...prev,
      achievements: typeof updater === "function" ? updater(prev.achievements) : updater,
    }));
  };

  // -------------------
  // ✅ Functions (copied from your code, adjusted for per-user)
  // -------------------
  const achievementList = [
    { id: 1, name: "First Habit Completed", condition: (player, habits, previousHabits, lastCompletedHabit) => lastCompletedHabit !== undefined },
    { id: 2, name: "Level 5 Achiever", condition: (player) => player.level >= 5 },
    { id: 3, name: "10 Habits Completed", condition: (player, habits, previousHabits) => previousHabits.filter(h => h.status === "completed").length >= 10 },
    { id: 4, name: "First Fail", condition: (player, habits, previousHabits) => previousHabits.some(h => h.status === "failed") },
    { id: 5, name: "5 Habits Completed", condition: (player, habits, previousHabits) => previousHabits.filter(h => h.status === "completed").length >= 5 },
    { id: 6, name: "Habit Streaker", condition: (player, habits, previousHabits) => {
        const completed = previousHabits.filter(h => h.status === "completed");
        if (completed.length < 3) return false;
        const lastThree = completed.slice(-3);
        return !lastThree.some(h => h.status !== "completed");
      }
    },
    { id: 7, name: "Monthly Master", condition: (player, habits, previousHabits, lastCompletedHabit) => lastCompletedHabit && lastCompletedHabit.period === "monthly" && lastCompletedHabit.status === "completed" },
    { id: 8, name: "Daily Grinder", condition: (player, habits, previousHabits) => previousHabits.filter(h => h.status === "completed" && h.period === "daily").length >= 7 },
    { id: 9, name: "XP Collector", condition: (player) => player.xp >= 200 },
    { id: 10, name: "Yearly Planner", condition: (player, habits, previousHabits, lastCompletedHabit) => lastCompletedHabit && lastCompletedHabit.period === "yearly" && lastCompletedHabit.status === "completed" },
    { id: 11, name: "Restart Enthusiast", condition: (player, habits, previousHabits, lastCompletedHabit) => lastCompletedHabit && lastCompletedHabit.restarted === true },
  ];

  const checkAchievements = (lastCompletedHabit, updatedPlayer) => {
    setAchievements((prevAchievements) => {
      const newAchievements = [...prevAchievements];
      achievementList.forEach((ach) => {
        if (newAchievements.some((a) => a.id === ach.id)) return;
        const playerToCheck = updatedPlayer || currentData.player;
        if (ach.condition(playerToCheck, currentData.habits, currentData.previousHabits, lastCompletedHabit)) {
          newAchievements.push(ach);
        }
      });
      return newAchievements;
    });
  };

  const calculateDueTime = (period) => {
    const now = new Date();
    switch (period) {
      case "daily": return now.getTime() + 24*60*60*1000;
      case "weekly": return now.getTime() + 7*24*60*60*1000;
      case "monthly": { const nextMonth = new Date(now); nextMonth.setMonth(now.getMonth()+1); return nextMonth.getTime(); }
      case "yearly": { const nextYear = new Date(now); nextYear.setFullYear(now.getFullYear()+1); return nextYear.getTime(); }
      default: return now.getTime() + 24*60*60*1000;
    }
  };

  const addHabit = (habit) => {
    const newHabit = { ...habit, id: Date.now(), due: calculateDueTime(habit.period), createdAt: Date.now() };
    setHabits((prev) => [...prev, newHabit]);
  };

  const completeHabit = (id) => {
    setHabits((prev) => {
      const habit = prev.find((h) => h.id === id);
      if (!habit) return prev;

      setPlayer((p) => {
        const newXp = (p.xp || 0) + (habit.points || 0);
        const newCoins = (p.coins || 0) + (habit.points || 0);
        const newLevel = Math.floor(newXp / 100) + 1;
        const updatedPlayer = { xp: newXp, level: newLevel, coins: newCoins };
        checkAchievements(habit, updatedPlayer);
        return updatedPlayer;
      });

      setPreviousHabits((prevPrev) => {
        if (prevPrev.some((h) => h.id === habit.id)) return prevPrev;
        const endTime = Date.now();
        return [
          ...prevPrev,
          {
            ...habit,
            status: "completed",
            endedAt: endTime,
            duration: Math.max(1, Math.ceil((endTime - (habit.createdAt || endTime)) / (1000 * 60 * 60 * 24))),
            points: habit.points || 10,
          },
        ];
      });

      return prev.filter((h) => h.id !== id);
    });
  };

  const failHabit = (id) => {
    setHabits((prev) => {
      const habit = prev.find((h) => h.id === id);
      if (!habit) return prev;

      setPlayer((p) => {
        const newXp = Math.max(0, (p.xp || 0) - (habit.points || 0));
        const newCoins = Math.max(0, (p.coins || 0) - Math.floor((habit.points || 0) / 2));
        const newLevel = Math.floor(newXp / 100) + 1;
        const updatedPlayer = { xp: newXp, level: newLevel, coins: newCoins };
        checkAchievements();
        return updatedPlayer;
      });

      setPreviousHabits((prevPrev) => {
        if (prevPrev.some((h) => h.id === habit.id)) return prevPrev;
        const endTime = Date.now();
        return [
          ...prevPrev,
          {
            ...habit,
            status: "failed",
            endedAt: endTime,
            duration: Math.max(1, Math.ceil((endTime - (habit.createdAt || endTime)) / (1000 * 60 * 60 * 24))),
            points: 0,
          },
        ];
      });

      return prev.filter((h) => h.id !== id);
    });
  };

  const restartHabit = (id) => {
    const habit = currentData.previousHabits.find((h) => h.id === id);
    if (!habit) return;
    const restartedHabit = { ...habit, id: Date.now(), due: calculateDueTime(habit.period), restarted: true };
    setHabits((prev) => [...prev, restartedHabit]);
  };

  const resetAchievements = () => {
    setAchievements([]);
  };

  const hardReset = () => {
    setHabits([]);
    setPreviousHabits([]);
    setPlayer({ xp: 0, level: 1, coins: 0 });
    setAchievements([]);
  };

  // -------------------
  // Auto expiry check
  // -------------------
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setHabits((prev) => {
        const active = [];
        const toMove = [];
        prev.forEach((h) => (h.due <= now ? toMove.push(h) : active.push(h)));
        if (toMove.length > 0) {
          setPreviousHabits((prevPrev) => {
            const newPrev = [...prevPrev];
            toMove.forEach((h) => {
              if (!newPrev.some((ph) => ph.id === h.id)) newPrev.push({ ...h, status: "failed" });
            });
            return newPrev;
          });
        }
        return active;
      });
    }, 1000 * 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <HabitContext.Provider
      value={{
        habits: currentData.habits,
        previousHabits: currentData.previousHabits,
        player: currentData.player,
        achievements: currentData.achievements,
        addHabit,
        completeHabit,
        failHabit,
        restartHabit,
        resetAchievements,
        hardReset,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};
