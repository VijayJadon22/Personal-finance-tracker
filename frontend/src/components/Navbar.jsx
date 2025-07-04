import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logoutUser } = useAuthContext();
  // Replace with your actual auth check logic
  const isAuthenticated = user || false;

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <nav className="w-full bg-cyan-700 text-white  shadow-md py-3 sticky top-0 z-50 px-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
          <img src="/expense-logo.png" alt="expense-logo" className="w-8"/> Finance Tracker
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {isAuthenticated ? (
            <>
              <Link to={"/"} className="hover:text-cyan-300 cursor-pointer font-semibold">
                Hi, {user?.name.split(" ")[0]}
              </Link>
              <Link to="/expenses" className="hover:text-cyan-300 font-semibold">
                Expenses
              </Link>
              <Link to="/budget" className="hover:text-cyan-300 font-semibold">
                Budget
              </Link>
              <Link to="/reports" className="hover:text-cyan-300 font-semibold">
                Reports
              </Link>
              <button
                onClick={handleLogout}
                className=" hover:bg-cyan-600 text-white px-3 py-1 rounded cursor-pointer font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-cyan-300 font-semibold">
                Login
              </Link>
              <Link to="/signup" className="hover:text-cyan-300 font-semibold">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 cursor-pointer"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-2 px-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <Link to="/expenses" onClick={() => setIsOpen(false)}>
                Expenses
              </Link>
              <Link to="/budget" onClick={() => setIsOpen(false)}>
                Budget
              </Link>
              <Link to="/reports" onClick={() => setIsOpen(false)}>
                Reports
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
