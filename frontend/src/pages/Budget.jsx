import React, { useEffect } from "react";
import { useBudgetContext } from "../context/BudgetContext";
import BudgetForm from "../components/budget/BudgetForm";
import BudgetAlerts from "../components/budget/BudgetAlerts";
import BudgetList from "../components/budget/BudgetList";

const BudgetPage = () => {
  const { fetchBudgets, fetchAlerts, budgets, alerts } = useBudgetContext();

  useEffect(() => {
    fetchBudgets();
    fetchAlerts();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">Manage Budgets</h1>

      {/* Form to Add/Update Budget */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Set Monthly Budget</h2>
        <BudgetForm />
      </div>

      {/* Overbudget Warnings */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Alerts</h2>
        <BudgetAlerts alerts={alerts} />
      </div>

      {/* List of Budgets */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Your Budgets</h2>
        <BudgetList budgets={budgets} />
      </div>
    </div>
  );
};

export default BudgetPage;
