import { useState } from "react";
import { createContext, useContext } from "react";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ExpenseContext = createContext();

export const useExpenseContext = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/expenses");
      setExpenses(response.data.expenses);
    } catch (error) {
      // toast.error("Failed to load expenses");
      console.error("Expense fetch error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/expenses", data);
      setExpenses((prev) => [response.data.expense, ...prev]);
      toast.success("Expense added", { id: "added" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Add failed");
    } finally {
      setLoading(false);
    }
  };

  const editExpense = async (id, data) => {
    setLoading(true);
    try {
      const response = await axios.put(`/expenses/${id}`, data);
      setExpenses((prev) =>
        prev.map((e) => (e._id === id ? response.data.expense : e))
      );
      toast.success("Expense updated", { id: "updated" });
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
      toast.success("Deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const value = {
    expenses,
    fetchExpenses,
    addExpense,
    editExpense,
    deleteExpense,
    loading,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
