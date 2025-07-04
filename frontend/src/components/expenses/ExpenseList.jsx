import { useExpenseContext } from "../../context/ExpenseContext";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, onEdit }) => {
  const { deleteExpense } = useExpenseContext();

  if (!expenses.length) {
    return <p className="text-center text-gray-500">No expenses yet.</p>;
  }

  return (
    <div className="space-y-4">
      {expenses.map((exp) => (
        <ExpenseItem
          key={exp._id}
          expense={exp}
          onEdit={onEdit}
          onDelete={deleteExpense}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
