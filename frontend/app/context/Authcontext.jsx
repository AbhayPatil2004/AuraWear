"use client";

import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);

      if (parsed.expiry && parsed.expiry < Date.now()) {
        localStorage.removeItem("user");
        return;
      }

      setUser(parsed.value);
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
