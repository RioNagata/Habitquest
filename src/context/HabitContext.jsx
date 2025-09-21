// src/context/HabitContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  // Habits
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  // Previous habits
  const [previousHabits, setPreviousHabits] = useState(() => {
    const saved = localStorage.getItem("previousHabits");
    return saved ? JSON.parse(saved) : [];
  });

  // Player: XP, level, coins
  const [player, setPlayer] = useState(() => {
    const saved = localStorage.getItem("player");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        xp: parsed.xp || 0,
        level: parsed.level || 1,
        coins: parsed.coins || 0, // ensure coins exists
      };
    }
    return { xp: 0, level: 1, coins: 0 };
  });

  // Achievements
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem("achievements");
    return saved ? JSON.parse(saved) : [];
  });

  // Achievement list
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

  // Check achievements
  const checkAchievements = (lastCompletedHabit, updatedPlayer) => {
    setAchievements(prevAchievements => {
      const newAchievements = [...prevAchievements];
      achievementList.forEach(ach => {
        if (newAchievements.some(a => a.id === ach.id)) return;
        const playerToCheck = updatedPlayer || player;
        if (ach.condition(playerToCheck, habits, previousHabits, lastCompletedHabit)) {
          newAchievements.push(ach);
        }
      });
      return newAchievements;
    });
  };

  // Calculate due time
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

  // Add habit
  const addHabit = (habit) => {
  const newHabit = { 
    ...habit, 
    id: Date.now(), 
    due: calculateDueTime(habit.period), 
    createdAt: Date.now() // ✅ track start time
  };
  setHabits(prev => [...prev, newHabit]);
};


  // ✅ Complete habit
const completeHabit = (id) => {
  setHabits(prev => {
    const habit = prev.find(h => h.id === id);
    if (!habit) return prev;

    setPlayer(p => {
      const newXp = (p.xp || 0) + (habit.points || 0);
      const newCoins = (p.coins || 0) + (habit.points || 0); // coins safe
      const newLevel = Math.floor(newXp / 100) + 1;
      const updatedPlayer = { xp: newXp, level: newLevel, coins: newCoins };
      checkAchievements(habit, updatedPlayer);
      return updatedPlayer;
    });

    setPreviousHabits(prevPrev => {
      if (prevPrev.some(h => h.id === habit.id)) return prevPrev;
      const endTime = Date.now();
      return [
        ...prevPrev,
        {
          ...habit,
          status: "completed",
          endedAt: endTime,
          duration: Math.max(
            1,
            Math.ceil((endTime - (habit.createdAt || endTime)) / (1000 * 60 * 60 * 24))
          ),
          points: habit.points || 10,
        }
      ];
    });

    return prev.filter(h => h.id !== id);
  });
};

// ✅ Fail habit
const failHabit = (id) => {
  setHabits(prev => {
    const habit = prev.find(h => h.id === id);
    if (!habit) return prev;

    setPlayer(p => {
      const newXp = Math.max(0, (p.xp || 0) - (habit.points || 0));
      const newCoins = Math.max(0, (p.coins || 0) - Math.floor((habit.points || 0)/2));
      const newLevel = Math.floor(newXp / 100) + 1;
      const updatedPlayer = { xp: newXp, level: newLevel, coins: newCoins };
      checkAchievements();
      return updatedPlayer;
    });

    setPreviousHabits(prevPrev => {
      if (prevPrev.some(h => h.id === habit.id)) return prevPrev;
      const endTime = Date.now();
      return [
        ...prevPrev,
        {
          ...habit,
          status: "failed",
          endedAt: endTime,
          duration: Math.max(
            1,
            Math.ceil((endTime - (habit.createdAt || endTime)) / (1000 * 60 * 60 * 24))
          ),
          points: 0,
        }
      ];
    });

    return prev.filter(h => h.id !== id);
  });
};


  // Restart habit
  const restartHabit = (id) => {
    const habit = previousHabits.find(h => h.id === id);
    if (!habit) return;
    const restartedHabit = { ...habit, id: Date.now(), due: calculateDueTime(habit.period), restarted: true };
    setHabits(prev => [...prev, restartedHabit]);
  };

  // Reset achievements
  const resetAchievements = () => {
    setAchievements([]);
    localStorage.removeItem("achievements");
  };

  // Hard reset everything
  const hardReset = () => {
    setHabits([]);
    setPreviousHabits([]);
    setPlayer({ xp: 0, level: 1, coins: 0 }); // ✅ coins included
    setAchievements([]);
    localStorage.removeItem("habits");
    localStorage.removeItem("previousHabits");
    localStorage.removeItem("player");
    localStorage.removeItem("achievements");
  };

  // Auto expiry
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setHabits(prev => {
        const active = [];
        const toMove = [];
        prev.forEach(h => h.due <= now ? toMove.push(h) : active.push(h));
        if (toMove.length > 0) {
          setPreviousHabits(prevPrev => {
            const newPrev = [...prevPrev];
            toMove.forEach(h => {
              if (!newPrev.some(ph => ph.id === h.id)) newPrev.push({ ...h, status: "failed" });
            });
            return newPrev;
          });
        }
        return active;
      });
    }, 1000*10);
    return () => clearInterval(interval);
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("previousHabits", JSON.stringify(previousHabits));
    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }, [habits, previousHabits, player, achievements]);

  return (
    <HabitContext.Provider value={{
      habits,
      previousHabits,
      player,
      achievements,
      addHabit,
      completeHabit,
      failHabit,
      restartHabit,
      resetAchievements,
      hardReset
    }}>
      {children}
    </HabitContext.Provider>
  );
};
