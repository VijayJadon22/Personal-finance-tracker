import { useContext } from "react";
import { createContext } from "react";
import axios from "../lib/axios.js";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

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

  const signupUser = async (formData) => {
    setLoading(true);
    const toastId = toast.loading("Creating account...");
    try {
      const response = await axios.post("/auth/signup", formData);
      setUser(response.data.user);
      toast.success("Account created successfully!",{id:"signup"});
    } catch (error) {
      setUser(null);
      toast.error(error.response?.data.message || "Signup Failed");
      return { success: false };
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };
  const loginUser = async (formData) => {
    setLoading(true);
    const toastId = toast.loading("Logging in...");
    try {
      const response = await axios.post("/auth/login", formData);
      setUser(response.data.user);
      toast.success("Logged in successfully!",{id:"login"});
    } catch (error) {
      setUser(null);
      toast.error(error.response?.data.message || "Login Failed");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };
  const logoutUser = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      toast.success("Logged out!");
    } catch (error) {
      setUser(null);
      toast.error("Logout failed");
    }
  };

  const value = { user, loading, signupUser, loginUser, logoutUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
