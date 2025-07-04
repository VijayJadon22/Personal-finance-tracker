import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import generateReport from "../lib/api.js";
import toast from "react-hot-toast";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await axios.get("/reports");
      setReports(res.data.reports);
    } catch (error) {
      toast.error("Failed to load reports");
    }
  };

  const handleGenerateReport = async () => {
    try {
      toast.loading("Generating report...");
      await generateReport();
      toast.dismiss();
      toast.success("Monthly report generated!");
      fetchReports(); // Refresh the list
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Failed to generate report");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">Monthly Reports</h1>

      <div className="mb-4 text-right">
        <button
          onClick={handleGenerateReport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition"
        >
          Generate This Month's Report
        </button>
      </div>

      {reports.length === 0 ? (
        <p>No reports yet.</p>
      ) : (
        <div className="grid gap-4">
          {reports.map((r) => (
            <div
              key={r.id || r.month}
              className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-600"
            >
              <h2 className="text-lg font-semibold mb-1">{r.month} Summary</h2>
              <p>Total Spent: ₹{r.totalSpent}</p>
              <p>Top Category: {r.topCategory}</p>
              <p>
                Overbudget Categories:{" "}
                {r.overbudgetCategories?.length > 0
                  ? r.overbudgetCategories.join(", ")
                  : "None"}
              </p>
              <p className="text-sm text-gray-400">
                Generated:{" "}
                {r.createdAt
                  ? new Date(r.createdAt).toLocaleString()
                  : "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
