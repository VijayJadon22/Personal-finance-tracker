import { useContext } from "react";
import { createContext } from "react";
import axios from "../lib/axios.js";
import { useState } from "react";
import { useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/auth");
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = { user, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
