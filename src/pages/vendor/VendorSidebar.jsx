import { Link, useLocation } from "react-router-dom";

const VendorSidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="w-64 min-h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-6 text-center">
        Vendor Panel
      </h2>

      <nav className="space-y-2">
        <Link to="/vendor/dashboard" className={linkClass("/vendor/dashboard")}>
          Dashboard
        </Link>

        <Link to="/vendor/profile" className={linkClass("/vendor/profile")}>
          Profile
        </Link>

        <Link to="/vendor/packages" className={linkClass("/vendor/packages")}>
          My Packages
        </Link>

        <Link to="/vendor/bookings" className={linkClass("/vendor/bookings")}>
          Bookings
        </Link>
      </nav>
    </div>
  );
};

export default VendorSidebar;
