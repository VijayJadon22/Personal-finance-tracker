import { useState } from "react";
import { useBudgetContext } from "../../context/BudgetContext";

const BudgetForm = () => {
  const [form, setForm] = useState({
    category: "",
    month: "",
    limit: "",
  });

  const { setOrUpdateBudget } = useBudgetContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.month || !form.limit) return;
    setOrUpdateBudget(form);
    setForm({ category: "", month: "", limit: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
      <div>
        <label className="block text-sm text-gray-600">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600">Month</label>
        <input
          type="month"
          name="month"
          value={form.month}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Limit (₹)</label>
        <input
          type="number"
          name="limit"
          value={form.limit}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className=" bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
      >
        Save Budget
      </button>
    </form>
  );
};

export default BudgetForm;
