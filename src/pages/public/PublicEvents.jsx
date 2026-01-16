import { useState, useEffect } from "react";
import api from "../../api/axois.js";
import BookingModal from "../../components/common/BookingModal.jsx";

import HeroSection from "../../pages/home/HeroSection";
import ExploreSection from "../../pages/home/ExploreSection";
import CategorySection from "../../pages/home/CategorySection";

import { useNavigate } from "react-router-dom";

function PublicEvents() {
  const navigate = useNavigate();
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
    <div className="bg-gray-50">

      {/* 🔥 LANDING PAGE UI */}
      <HeroSection />
      <ExploreSection />
      <CategorySection />
    

      {/* 📦 PACKAGES LIST */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <h1 className="text-3xl font-bold text-center mb-8">
          Discover Event Packages
        </h1>

        {packages.length === 0 ? (
          <p className="text-center text-gray-500">
            No packages available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                onClick={() => navigate(`/package/${pkg._id}`)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={
                      pkg.images?.[0] ||
                      "https://via.placeholder.com/400x300"
                    }
                    alt={pkg.title}
                    className="h-48 w-full object-cover"
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
                    <span className="text-sm font-semibold">4.9</span>
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-xs text-gray-500">(287)</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {pkg.title}
                  </h3>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{Math.round(pkg.price * 1.25).toLocaleString()}
                      </span>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                      25% OFF
                    </span>
                  </div>

                  <div 
                    onClick={() => navigate(`/package/${pkg._id}`)}
                    className="text-center text-sm text-red-600 font-medium cursor-pointer hover:text-red-700"
                  >
                    View Details →
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🎉 KIDS BIRTHDAY DECORATIONS SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Kids Birthday Decorations
          </h2>
          <p className="text-lg text-gray-600">
            Fun-Filled Themes for Every Celebration!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Cocomelon Theme */}
          <div className="text-center group cursor-pointer">
            <div className="relative mb-4">
              <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-pink-200 to-pink-300 p-2 group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/cocomelon.jpeg"
                  alt="Cocomelon Theme"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Cocomelon Theme
            </h3>
          </div>

          {/* Baby Shark Theme */}
          <div className="text-center group cursor-pointer">
            <div className="relative mb-4">
              <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-pink-200 to-pink-300 p-2 group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/babyshark.jpeg"
                  alt="Baby Shark Theme"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Baby Shark Theme
            </h3>
          </div>

          {/* Boss Baby Theme */}
          <div className="text-center group cursor-pointer">
            <div className="relative mb-4">
              <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-blue-200 to-blue-300 p-2 group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/boss.jpeg"
                  alt="Boss Baby Theme"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Boss Baby Theme
            </h3>
          </div>

          {/* Jungle Theme */}
          <div className="text-center group cursor-pointer">
            <div className="relative mb-4">
              <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-green-200 to-green-300 p-2 group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/jungle.jpeg"
                  alt="Jungle Theme"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Jungle Theme
            </h3>
          </div>

          {/* Frozen Theme */}
          <div className="text-center group cursor-pointer">
            <div className="relative mb-4">
              <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-blue-200 to-purple-300 p-2 group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/frozen.jpeg"
                  alt="Frozen Theme"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Frozen Theme
            </h3>
          </div>

          {/* Mermaid Theme */}
          <div className="text-center group cursor-pointer">
            <div className="relative mb-4">
              <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-teal-200 to-blue-300 p-2 group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/memmaid.jpeg"
                  alt="Mermaid Theme"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Mermaid Theme
            </h3>
          </div>
        </div>
      </div>

      {/* 💒 THE WEDDING COLLECTION SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            The Wedding Collection
          </h2>
          <p className="text-lg text-gray-600">
            From Haldi to Honeymoon
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Bridal Shower */}
          <div className="text-center group cursor-pointer">
            <div className="relative mb-4">
              <div className="w-40 h-40 mx-auto rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/baby-shower.jpg"
                  alt="Bridal Shower"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Bridal Shower
            </h3>
          </div>

          {/* Haldi Decor */}
          <div className="text-center group cursor-pointer">
            <div className="relative mb-4">
              <div className="w-40 h-40 mx-auto rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/anniversary.jpg"
                  alt="Haldi Decor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Haldi Decor
            </h3>
          </div>

          {/* Mehndi Decor */}
          <div className="text-center group cursor-pointer">
            <div className="relative mb-4">
              <div className="w-40 h-40 mx-auto rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/corporate.jpg"
                  alt="Mehndi Decor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Mehndi Decor
            </h3>
          </div>

          {/* Wedding Car */}
          <div className="text-center group cursor-pointer">
            <div className="relative mb-4">
              <div className="w-40 h-40 mx-auto rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/christmas.jpg"
                  alt="Wedding Car"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Wedding Car
            </h3>
          </div>

          {/* Bride Welcome */}
          <div className="text-center group cursor-pointer">
            <div className="relative mb-4">
              <div className="w-40 h-40 mx-auto rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/bride-welcome.jpg"
                  alt="Bride Welcome"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              Bride Welcome
            </h3>
          </div>

          {/* First Night */}
          <div className="text-center group cursor-pointer">
            <div className="relative mb-4">
              <div className="w-40 h-40 mx-auto rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src="/src/assets/images/first-night.jpg"
                  alt="First Night"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">
              First Night
            </h3>
          </div>
        </div>
      </div>

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
