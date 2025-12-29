import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axois";
import { AuthContext } from "../../context/AuthContext";

const UserHome = () => {
  console.log("HOME COMPONENT RENDERED");

  const { user, logout } = useContext(AuthContext);

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get("/packages"); // user browse packages API
        setPackages(res.data.packages || []);
      } catch (error) {
        console.error("Error fetching packages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return <div className="p-6">Loading packages...</div>;
  }

  return (
    <div className="p-6">
      {/* 🔹 HEADER WITH LOGIN / LOGOUT */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Available Event Packages
        </h1>

        {!user ? (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </div>
        ) : (
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>

      {/* 🔹 PACKAGES LIST */}
      {packages.length === 0 ? (
        <p>No packages available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="border rounded-lg shadow p-4"
            >
              {/* IMAGE */}
              {pkg.images && pkg.images.length > 0 && (
                <img
                  src={pkg.images[0]}
                  alt={pkg.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}

              {/* TITLE */}
              <h2 className="text-lg font-semibold">
                {pkg.title}
              </h2>

              {/* EVENT TYPE */}
              <p className="text-sm text-gray-500">
                Event: {pkg.eventType}
              </p>

              {/* PRICE */}
              <p className="font-bold mt-2">
                ₹ {pkg.price}
              </p>

              {/* BUTTON (future booking) */}
              <button
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHome;
