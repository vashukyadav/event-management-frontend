import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axois.js";

const VendorPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      console.log("Fetching vendor packages...");
      const res = await api.get("/packages/vendor");
      console.log("API Response:", res.data);
      setPackages(res.data.packages || []);
    } catch (error) {
      console.error("Fetch packages error", error);
      console.error("Error response:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Packages</h1>

        <Link
          to="/vendor/add-package"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Package
        </Link>
      </div>

      {/* BODY */}
      {loading ? (
        <p>Loading...</p>
      ) : packages.length === 0 ? (
        <p className="text-gray-500">No packages created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded shadow p-4"
            >
              <img
                src={pkg.images?.[0] || "https://via.placeholder.com/300"}
                alt={pkg.title}
                className="h-40 w-full object-cover rounded mb-3"
              />

              <h3 className="font-bold text-lg">{pkg.title}</h3>
              <p className="text-gray-600 capitalize">{pkg.eventType}</p>
              <p className="text-green-600 font-bold">
                ₹{pkg.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorPackages;
