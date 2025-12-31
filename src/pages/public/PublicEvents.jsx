import { useState, useEffect } from "react";
import api from "../../api/axois.js";
import BookingModal from "./../../components/common/BookingModal.jsx";

function PublicEvents() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await api.get("/packages/public");
      setPackages(res.data.packages || []);
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-10">
        Discover Event Packages
      </h1>

      {packages.length === 0 ? (
        <p className="text-center text-gray-500">No packages available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={pkg.images?.[0] || "https://via.placeholder.com/400x300"}
                alt={pkg.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-gray-600 capitalize mb-1">
                  {pkg.eventType} event
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {pkg.vendorId?.city}
                </p>

                <p className="text-2xl font-bold text-green-600 mb-4">
                  ₹{pkg.price.toLocaleString()}
                </p>

                <button
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ BOOKING MODAL */}
      {isModalOpen && selectedPackage && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          package={selectedPackage}
        />
      )}
    </div>
  );
}

export default PublicEvents;
