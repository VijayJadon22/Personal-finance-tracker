import { createContext, useContext, useEffect, useState } from "react";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";

const BudgetContext = createContext();

export const useBudgetContext = () => useContext(BudgetContext);

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/budgets");
      setBudgets(response.data.budgets);
    } catch (error) {
    //   toast.error("Failed to load budgets");
    } finally {
      setLoading(false);
    }
  };

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("/budgets/alerts");
      setAlerts(res.data.alerts);
    } catch (error) {
    //   toast.error("Failed to load budget alerts");
    }
  };

  useEffect(() => {
    fetchBudgets();
    fetchAlerts();
  }, []);

  const setOrUpdateBudget = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post("/budgets", formData);
      toast.success("Budget saved");
      // Replace or add budget in list
      setBudgets((prev) => {
        const updated = prev.filter(
          (b) =>
            !(
              b.category === res.data.budget.category &&
              b.month === res.data.budget.month
            )
          );
          fetchAlerts();
        return [...updated, res.data.budget];
      });
    } catch (error) {
      toast.error("Failed to save budget");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    fetchBudgets,
    fetchAlerts,
    budgets,
    alerts,
    loading,
    setOrUpdateBudget,
  };
  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};
