import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ExpenseProvider } from "./context/ExpenseContext.jsx";
import { BudgetProvider } from "./context/BudgetContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ExpenseProvider>
          <BudgetProvider>
            <App />
          </BudgetProvider>
        </ExpenseProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
