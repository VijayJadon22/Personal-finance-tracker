import { useState, useEffect } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import ExpenseFilters from "../components/expenses/ExpenseFilters";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";

const ExpensesPage = () => {
  const { expenses } = useExpenseContext();

  const [filters, setFilters] = useState({
    category: "",
    paymentMethod: "",
    startDate: "",
    endDate: "",
  });

  const [editItem, setEditItem] = useState(null); // 🟡 To track editing

  // Scroll to top when editing
  useEffect(() => {
    if (editItem) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [editItem]);

  // Filter logic
  const filteredExpenses = expenses.filter((exp) => {
    const matchesCategory =
      !filters.category || exp.category === filters.category;
    const matchesPayment =
      !filters.paymentMethod || exp.paymentMethod === filters.paymentMethod;
    const matchesStartDate =
      !filters.startDate || new Date(exp.date) >= new Date(filters.startDate);
    const matchesEndDate =
      !filters.endDate || new Date(exp.date) <= new Date(filters.endDate);

    return (
      matchesCategory && matchesPayment && matchesStartDate && matchesEndDate
    );
  });

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">My Expenses</h1>

      {/* Show add form only when not editing */}
      {!editItem && (
        <div className="bg-white p-4 rounded-xl shadow mb-4">
          <h2 className="text-lg font-bold mb-2 text-center">Add Expense</h2>
          <ExpenseForm />
        </div>
      )}

      {/* Show edit form when editing */}
      {editItem && (
        <div className="bg-white p-4 rounded-xl shadow mb-4">
          <h2 className="text-lg font-bold mb-2 text-center">Edit Expense</h2>
          <ExpenseForm
            initialData={editItem}
            onClose={() => setEditItem(null)}
          />
        </div>
      )}

      {/* Filters */}
      <ExpenseFilters filters={filters} setFilters={setFilters} />

      {/* Expense List */}
      <ExpenseList expenses={filteredExpenses} onEdit={setEditItem} />
    </div>
  );
};

export default ExpensesPage;
