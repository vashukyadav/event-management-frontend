import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between">
      <Link to="/" className="font-bold text-lg hover:text-gray-300">Event Manager</Link>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-gray-300">Events</Link>
        
        {!user && (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </>
        )}

        {user?.role === "user" && (
          <>
            <Link to="/user/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/my-bookings" className="hover:text-gray-300">My Bookings</Link>
            <button onClick={logout} className="hover:text-gray-300">Logout</button>
          </>
        )}

        {user?.role === "vendor" && (
          <>
            <Link to="/vendor/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/vendor/packages" className="hover:text-gray-300">My Packages</Link>
            <Link to="/vendor/bookings" className="hover:text-gray-300">Bookings</Link>
            <button onClick={logout} className="hover:text-gray-300">Logout</button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
