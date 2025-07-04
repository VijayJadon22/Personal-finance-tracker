import { Pencil, Trash2 } from "lucide-react";

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-start gap-4">
      <div>
        <p className="text-lg font-semibold text-gray-800">₹{expense.amount}</p>
        <p className="text-sm text-gray-500">
          {expense.category} • {expense.paymentMethod}
        </p>
        <p className="text-xs text-gray-400">
          {new Date(expense.date).toDateString()}
        </p>
        {expense.notes && (
          <p className="text-sm text-gray-600 mt-1 italic">{expense.notes}</p>
        )}
      </div>

      <div className="flex gap-2 mt-1">
        <button onClick={() => onEdit(expense)}>
          <Pencil
            size={18}
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
          />
        </button>
        <button onClick={() => onDelete(expense._id)}>
          <Trash2
            size={18}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
