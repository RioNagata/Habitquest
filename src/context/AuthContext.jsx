// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // 💡 IMPORTANT: Ensure the user object loaded here includes profilePicUrl
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    // 💡 IMPORTANT: Ensure the users array includes the profilePicUrl property 
    // on all objects for consistency, defaulting to null if missing.
    const saved = localStorage.getItem("users");
    const parsedUsers = saved ? JSON.parse(saved) : [];
    // Ensure all users have the profilePicUrl property on load
    return parsedUsers.map(u => ({ ...u, profilePicUrl: u.profilePicUrl || null }));
  });

  const login = (username, password) => {
    const existing = users.find(
      (u) => u.username === username && u.password === password
    );
    if (existing) {
      setUser(existing);
      localStorage.setItem("user", JSON.stringify(existing));
      return true;
    }
    return false;
  };

  const register = (username, password) => {
    if (users.some((u) => u.username === username)) {
      return false; // username taken
    }
    // 📸 NEW: Initialize newUser with profilePicUrl set to null
    const newUser = { id: Date.now(), username, password, profilePicUrl: null }; 
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ✅ Update username
  const updateUsername = (newUsername) => {
    if (!user) return false;
    if (users.some((u) => u.username === newUsername)) {
      return false; // username already exists
    }
    const updatedUser = { ...user, username: newUsername };
    const updatedUsers = users.map((u) =>
      u.id === user.id ? updatedUser : u
    );

    setUser(updatedUser);
    setUsers(updatedUsers);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return true;
  };

  // ✅ Update password
  const updatePassword = (oldPassword, newPassword) => {
    if (!user || user.password !== oldPassword) return false;

    const updatedUser = { ...user, password: newPassword };
    const updatedUsers = users.map((u) =>
      u.id === user.id ? updatedUser : u
    );

    setUser(updatedUser);
    setUsers(updatedUsers);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return true;
  };

  // 📸 NEW FUNCTION: Update the profile picture URL for the current user
  const updateProfilePicture = (newPicUrl) => {
    if (!user) return;

    // 1. Update the current user object
    const updatedUser = { ...user, profilePicUrl: newPicUrl };
    
    // 2. Update the 'users' array in state and local storage
    const updatedUsers = users.map((u) =>
      u.id === user.id ? updatedUser : u
    );

    // 3. Save all changes
    setUser(updatedUser);
    setUsers(updatedUsers);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        register,
        logout,
        updateUsername,
        updatePassword,
        updateProfilePicture, // 📸 EXPOSE THE NEW FUNCTION
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};