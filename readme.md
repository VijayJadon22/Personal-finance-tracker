# 💸 Personal Finance Tracker+

**Personal Finance Tracker+** is a full-stack web application that allows users to manage their personal finances. Users can track their expenses, set monthly budgets, visualize spending trends, receive budget alerts, and generate monthly financial reports.

This project demonstrates a strong understanding of **MERN stack** development (MongoDB, Express, React, Node.js), with an additional **SQLite layer for report persistence**, and modern frontend tools like **Tailwind CSS**, **Chart.js**, and **React Context**.

---

## ✅ Features Overview (with How It Works)

### 🔐 Authentication

- **Signup / Login / Logout**
- Uses **JWT tokens** stored in **HTTP-only cookies**.
- Protected routes on backend via `authMiddleware`.
- Frontend uses `AuthContext` to manage auth state and make authenticated requests via Axios.
- On login/signup, user data is stored in `localStorage` for quick access.

### 💼 Expense Management

Users can:

- Add expenses with category, amount, payment method, and date.
- Edit and delete expenses.
- View their expense history in a list with filters.

**How it works:**

- Data is stored in MongoDB in the `Expense` model.
- All expense APIs are protected.
- Editing uses a lifted `editItem` state — clicking “Edit” scrolls to top and loads the existing expense data into the form.

### 🔍 Filtering

Filter expenses by:

- Category
- Payment method
- Start and end date

**How it works:**

- Filters are handled using controlled inputs and local component state.
- The filtered list is computed using a `useEffect`-driven `filteredExpenses` array based on `filters`.

### 🎯 Budgets and Alerts

Users can:

- Set monthly budget limits per category.
- Get alert badges when they’re approaching or exceeding limits.

**How it works:**

- Budgets are saved in MongoDB using the `Budget` model.
- `getBudgetAlerts` API compares category-wise monthly expense totals to budget limits.
- Backend logic categorizes alerts into:
  - ✅ OK
  - ⚠️ Warning (80–99%)
  - 🚨 Overbudget (100%+)
- Alerts are fetched and displayed using color-coded UI.

### 📊 Dashboard (Visualizations with Chart.js)

A quick glance at:

- Total spent (this month)
- Top spending category
- Top 3 payment methods
- Pie chart: Category-wise spending
- Line graph: Daily spending over the month

**How it works:**

- `/dashboard` route calculates:
  - Total spent this month
  - Top category
  - Top payment methods (from `expense.paymentMethod`)
  - Pie data (category totals)
  - Line data (sum by day)
- Data is visualized using `react-chartjs-2` and Chart.js plugins.
- Pie chart uses `chartjs-plugin-datalabels` to show percentages.

### 🧾 Monthly Reports (Dynamic SQL Storage)

Users can:

- View a monthly report of total spent, top category, and overbudget categories.
- Click a button to generate the report dynamically from current MongoDB data.
- Only last 3 reports are shown.

**How it works:**

- Button triggers POST to `/reports/generate`.
- Backend:
  1. Pulls all current month expenses from MongoDB.
  2. Calculates totals and overbudget categories.
  3. Saves the summary into a SQLite database (`monthly_reports.db`) using `better-sqlite3`.
- On frontend, the report is shown with a nice UI and `new Date(...).toLocaleString()` timestamp.

---

## 🧠 Technical Stack

### Frontend

- **React** with **Vite**
- **Tailwind CSS** for styling
- **Chart.js** via `react-chartjs-2`
- **React Context API** for auth, expenses, budgets
- **Axios** for API calls
- **React Hot Toast** for notifications

### Backend

- **Node.js** with **Express**
- **MongoDB** with **Mongoose** (main database)
- **SQLite** (monthly report storage)
- **JWT** authentication with cookies
- MVC structure with clear route separation

---

## ⚙️ Project Setup

### Prerequisites

- Node.js
- MongoDB
- SQLite (automatically created via `better-sqlite3`)

### Clone and Install

```bash
git clone https://github.com/your-username/personal-finance-tracker.git
cd personal-finance-tracker

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```


Create a .env file in server with:

PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173



**Folder Structure** 

client/
├── components/
│   └── expenses/, budgets/, dashboard/
├── context/
├── pages/
├── lib/
│   └── axios.js, api.js
└── App.jsx

server/
├── controllers/
│   └── expense.controller.js, budget.controller.js, report.controller.js
├── routes/
├── models/
├── utils/
│   └── saveMonthlyReport.js
├── config/
│   └── sqlite.js
└── index.js


**Core API Routes**

| Route                   | Method     | Description                   |
| ----------------------- | ---------- | ----------------------------- |
| `/api/auth/signup`      | POST       | Create new user               |
| `/api/auth/login`       | POST       | Login user                    |
| `/api/auth/logout`      | POST       | Logout                        |
| `/api/expenses/`        | GET/POST   | Get or add expense            |
| `/api/expenses/:id`     | PUT/DELETE | Update or delete expense      |
| `/api/budgets/`         | GET/POST   | Set/get budgets               |
| `/api/budgets/alerts`   | GET        | Get budget alerts             |
| `/api/reports`          | GET        | Get last 3 reports            |
| `/api/reports/generate` | POST       | Generate current month report |
| `/api/dashboard`        | GET        | Dashboard data (charts)       |

