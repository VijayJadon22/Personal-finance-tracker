import { useState, useEffect } from "react";
import { useExpenseContext } from "../../context/ExpenseContext";
import toast from "react-hot-toast";

const defaultForm = {
  amount: "",
  category: "",
  date: "",
  paymentMethod: "",
  notes: "",
};

const categories = ["Food", "Rent", "Shopping", "Health", "Travel", "Other"];
const methods = ["UPI", "Credit Card", "Cash", "Debit Card", "Net Banking", "Other"];

const ExpenseForm = ({ initialData = null, onClose }) => {
  const [form, setForm] = useState(defaultForm);
  const { addExpense, editExpense } = useExpenseContext();

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        date: initialData.date?.slice(0, 10), // format for input
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { amount, category, date, paymentMethod } = form;
    if (!amount || !category || !date || !paymentMethod) {
      toast.error("Please fill all required fields");
      return;
    }

    if (initialData) {
      await editExpense(initialData._id, form);
    } else {
      await addExpense(form);
      setForm(defaultForm);
    }

    onClose?.(); // Close modal or form if provided
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow space-y-4 w-full"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Payment Method</label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select</option>
            {methods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-700">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows="2"
        />
      </div>

      <div className="flex justify-between">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:underline cursor-pointer"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {initialData ? "Update" : "Add"} Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
