import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between">
      <h1 className="font-bold text-lg">Event Manager</h1>

      <div className="flex gap-4 items-center">

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user?.role === "user" && (
          <>
            <Link to="/">Home</Link>
            <Link to="/my-bookings">My Bookings</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}

        {user?.role === "vendor" && (
          <>
            <Link to="/vendor/dashboard">Dashboard</Link>
            <Link to="/vendor/packages">My Packages</Link>
            <Link to="/vendor/bookings">Bookings</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
