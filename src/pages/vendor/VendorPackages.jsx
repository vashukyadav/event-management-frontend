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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    
    try {
      await api.delete(`/packages/${id}`);
      alert("Package deleted successfully!");
      fetchPackages();
    } catch (error) {
      alert("Failed to delete package");
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
              <p className="text-green-600 font-bold mb-3">
                ₹{pkg.price}
              </p>

              <div className="flex gap-2">
                <Link
                  to={`/vendor/edit-package/${pkg._id}`}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-center text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorPackages;
