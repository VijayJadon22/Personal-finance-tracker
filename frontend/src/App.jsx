import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/dashboard"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/dashboard"} />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/expenses"
          element={user ? <Expenses /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/budget"
          element={user ? <Budget /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/reports"
          element={user ? <Reports /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
