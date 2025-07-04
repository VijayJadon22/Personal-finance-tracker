const ExpenseFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4 grid md:grid-cols-4 gap-4">
      {/* Category Filter */}
      <div>
        <label className="text-sm text-gray-600">Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full border border-gray-400 p-2 rounded"
        >
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
        </select>
      </div>

      {/* Payment Method Filter */}
      <div>
        <label className="text-sm text-gray-600">Payment Method</label>
        <select
          name="paymentMethod"
          value={filters.paymentMethod}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">All</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
        </select>
      </div>

      {/* Start Date Filter */}
      <div>
        <label className="text-sm text-gray-600">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* End Date Filter */}
      <div>
        <label className="text-sm text-gray-600">End Date</label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
    </div>
  );
};

export default ExpenseFilters;
