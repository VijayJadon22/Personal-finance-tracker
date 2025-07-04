const BudgetList = ({ budgets }) => {
  if (!budgets || budgets.length === 0) {
    return <p className="text-gray-500">No budgets set yet.</p>;
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left bg-gray-100">
          <th className="p-2">Category</th>
          <th className="p-2">Month</th>
          <th className="p-2">Limit (₹)</th>
        </tr>
      </thead>
      <tbody>
        {budgets.map((budget) => (
          <tr key={`${budget.category}-${budget.month}`} className="border-t">
            <td className="p-2">{budget.category}</td>
            <td className="p-2">{budget.month}</td>
            <td className="p-2">{budget.limit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BudgetList;
