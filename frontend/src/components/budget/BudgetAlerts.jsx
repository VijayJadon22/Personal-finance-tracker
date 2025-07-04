const BudgetAlerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return <p className="text-gray-500">No alerts for this month.</p>;
  }

  return (
    <ul className="space-y-2">
      {alerts.map((alert) => (
        <li
          key={alert.category}
          className={`border-l-4 p-3 rounded bg-gray-50 ${
            alert.status === "Overbudget"
              ? "border-red-500"
              : alert.status === "Warning"
              ? "border-yellow-500"
              : "border-green-500"
          }`}
        >
          <div className="flex justify-between">
            <span className="font-semibold">{alert.category}</span>
            <span className="text-sm text-gray-600">{alert.percent}% used</span>
          </div>
          <div className="text-sm text-gray-700">
            Limit: ₹{alert.limit}, Spent: ₹{alert.spent}
          </div>
          <div
            className={`text-xs mt-1 ${
              alert.status === "Overbudget"
                ? "text-red-600"
                : alert.status === "Warning"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            Status: {alert.status}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BudgetAlerts;
