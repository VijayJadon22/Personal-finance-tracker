import React, { useEffect, useState } from "react";
import axios from "../lib/axios.js";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useExpenseContext } from "../context/ExpenseContext.jsx";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const { loading } = useExpenseContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get("/dashboard");
        setData(response.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error.message);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!data || !data.totalSpent) {
    return (
      <div className="p-4 max-w-4xl mx-auto text-center text-gray-500">
        <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
        <p>
          No expenses found yet. Add some expenses to see your dashboard
          summary.
        </p>
      </div>
    );
  }

  const {
    totalSpent,
    topCategory,
    topPaymentMethods,
    pieChartData,
    lineGraphData,
  } = data;

  const pieData = {
    labels: pieChartData.map((item) => item.category),
    datasets: [
      {
        label: "Spending by Category",
        data: pieChartData.map((item) => item.amount),
        backgroundColor: [
          "#10b981",
          "#3b82f6",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
      },
    ],
  };

  const lineData = {
    labels: lineGraphData.map((item) => item.date),
    datasets: [
      {
        label: "Spending Over Time",
        data: lineGraphData.map((item) => item.amount),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total Spent (This Month)</p>
          <h2 className="text-xl font-semibold text-green-600">
            ₹{totalSpent}
          </h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Top Spending Category</p>
          <h2 className="text-xl font-semibold">{topCategory}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow col-span-2">
          <p className="text-gray-500 mb-1">Top 3 Payment Methods</p>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            {topPaymentMethods.map((method) => (
              <li key={method.method}>
                {method.method} ({method.count} times)
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Category-wise Spending</h3>
          <Pie data={pieData} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Spending Over Time</h3>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
