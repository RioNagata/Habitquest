// src/context/HabitContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });
  const [previousHabits, setPreviousHabits] = useState(() => {
    const saved = localStorage.getItem("previousHabits");
    return saved ? JSON.parse(saved) : [];
  });
  const [player, setPlayer] = useState(() => {
    const saved = localStorage.getItem("player");
    return saved ? JSON.parse(saved) : { xp: 0, level: 1 };
  });
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem("achievements");
    return saved ? JSON.parse(saved) : [];
  });

  // Achievement list
  const achievementList = [
    {
      id: 1,
      name: "First Habit Completed",
      condition: (player, habits, previousHabits, lastCompletedHabit) =>
        lastCompletedHabit !== undefined,
    },
    {
      id: 2,
      name: "Level 5 Achiever",
      condition: (player) => player.level >= 5,
    },
    {
      id: 3,
      name: "10 Habits Completed",
      condition: (player, habits, previousHabits) =>
        previousHabits.filter((h) => h.status === "completed").length >= 10,
    },
  ];

  // Check and unlock achievements
  const checkAchievements = (lastCompletedHabit, updatedPlayer) => {
    setAchievements((prevAchievements) => {
      const newAchievements = [...prevAchievements];

      achievementList.forEach((ach) => {
        if (newAchievements.some((a) => a.id === ach.id)) return;

        const playerToCheck = updatedPlayer || player;

        if (ach.condition(playerToCheck, habits, previousHabits, lastCompletedHabit)) {
          newAchievements.push(ach);
        }
      });

      return newAchievements;
    });
  };

  // Helper: calculate habit due time
  const calculateDueTime = (period) => {
    const now = new Date();
    switch (period) {
      case "daily":
        return now.getTime() + 24 * 60 * 60 * 1000;
      case "weekly":
        return now.getTime() + 7 * 24 * 60 * 60 * 1000;
      case "monthly":
        const nextMonth = new Date(now);
        nextMonth.setMonth(now.getMonth() + 1);
        return nextMonth.getTime();
      case "yearly":
        const nextYear = new Date(now);
        nextYear.setFullYear(now.getFullYear() + 1);
        return nextYear.getTime();
      default:
        return now.getTime() + 24 * 60 * 60 * 1000;
    }
  };

  // Add a new habit
  const addHabit = (habit) => {
    const newHabit = { ...habit, id: Date.now(), due: calculateDueTime(habit.period) };
    setHabits((prev) => [...prev, newHabit]);
  };

  // Complete habit
  const completeHabit = (id) => {
    setHabits((prev) => {
      const habit = prev.find((h) => h.id === id);
      if (!habit) return prev;

      // Update player XP/level
      setPlayer((p) => {
        const newXp = p.xp + habit.points;
        const newLevel = Math.floor(newXp / 100) + 1;
        const updatedPlayer = { xp: newXp, level: newLevel };

        checkAchievements(habit, updatedPlayer);
        return updatedPlayer;
      });

      // Move to previous habits once
      setPreviousHabits((prevPrev) => {
        if (prevPrev.some((h) => h.id === habit.id)) return prevPrev;
        return [...prevPrev, { ...habit, status: "completed" }];
      });

      return prev.filter((h) => h.id !== id);
    });
  };

  // Fail habit
  const failHabit = (id) => {
    setHabits((prev) => {
      const habit = prev.find((h) => h.id === id);
      if (!habit) return prev;

      setPlayer((p) => {
        const newXp = Math.max(0, p.xp - habit.points);
        const newLevel = Math.floor(newXp / 100) + 1;
        const updatedPlayer = { xp: newXp, level: newLevel };
        checkAchievements(); // check achievements after XP loss
        return updatedPlayer;
      });

      setPreviousHabits((prevPrev) => {
        if (prevPrev.some((h) => h.id === habit.id)) return prevPrev;
        return [...prevPrev, { ...habit, status: "failed" }];
      });

      return prev.filter((h) => h.id !== id);
    });
  };

  // Restart habit from previous
  const restartHabit = (id) => {
    const habit = previousHabits.find((h) => h.id === id);
    if (!habit) return;

    const restartedHabit = { ...habit, id: Date.now(), due: calculateDueTime(habit.period) };
    setHabits((prev) => [...prev, restartedHabit]);
  };

  // Reset achievements
  const resetAchievements = () => {
    setAchievements([]);
    localStorage.removeItem("achievements");
  };

  // Auto check expired habits → move to previous
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      setHabits((prev) => {
        const active = [];
        const toMove = [];

        prev.forEach((habit) => {
          if (habit.due <= now) {
            toMove.push(habit);
          } else {
            active.push(habit);
          }
        });

        // Batch add expired habits to previousHabits
        if (toMove.length > 0) {
          setPreviousHabits((prevPrev) => {
            const newPrev = [...prevPrev];
            toMove.forEach((habit) => {
              if (!newPrev.some((h) => h.id === habit.id)) {
                newPrev.push({ ...habit, status: "failed" });
              }
            });
            return newPrev;
          });
        }

        return active;
      });
    }, 1000 * 10);

    return () => clearInterval(interval);
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("previousHabits", JSON.stringify(previousHabits));
    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }, [habits, previousHabits, player, achievements]);

  return (
    <HabitContext.Provider
      value={{
        habits,
        previousHabits,
        player,
        achievements,
        addHabit,
        completeHabit,
        failHabit,
        restartHabit,
        resetAchievements,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};
