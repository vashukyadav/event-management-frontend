import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../../api/axois.js";
import BookingModal from "../../components/common/BookingModal";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "../../context/LocationContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { selectedCity } = useLocation();

  const [pkg, setPkg] = useState(null);
  const [relatedPackages, setRelatedPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openBooking, setOpenBooking] = useState(false);
  const [activeTab, setActiveTab] = useState("inclusion");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetchPackage();
    fetchRelatedPackages();
  }, []);

  const fetchPackage = async () => {
    try {
      console.log('Fetching package with ID:', id);
      const res = await api.get(`/packages/${id}`);
      console.log('API Response:', res.data);
      setPkg(res.data.package);
    } catch (err) {
      console.error('API Error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPackages = async () => {
    try {
      const res = await api.get("/packages/public");
      setRelatedPackages(res.data.packages?.slice(0, 6) || []);
    } catch (err) {
      console.error("Related packages error:", err);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate("/cart", { state: { package: pkg } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!pkg) {
    return <p className="text-center mt-20 text-gray-600">Package not found</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ===== BREADCRUMB ===== */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-500 space-x-2">
            <span className="hover:text-pink-500 cursor-pointer">Home</span>
            <span>›</span>
            <span className="hover:text-pink-500 cursor-pointer">{pkg.eventType} Decorations</span>
            <span>›</span>
            <span className="text-pink-500 font-medium">{pkg.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ===== LEFT: IMAGES ===== */}
          <div className="">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              {/* Main Image */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-navy-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Exclusive
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <img
                  src={pkg.images?.[selectedImageIndex] || pkg.images?.[0]}
                  alt={pkg.title}
                  className="w-full h-80 object-cover"
                />
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors">
                  View Similar →
                </button>
              </div>
              
              {/* Thumbnail Images */}
              {pkg.images && pkg.images.length > 1 && (
                <div className="p-4 flex gap-3 overflow-x-auto">
                  {pkg.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${pkg.title} ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all flex-shrink-0 ${
                        selectedImageIndex === index ? 'border-pink-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ===== RIGHT: PRODUCT INFO ===== */}
          <div className="space-y-4">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-medium">
                  🏆 #1 Decoration Website in India
                </span>
              </div>
              
              <h1 className="text-xl font-bold text-gray-900 mb-3">{pkg.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-2xl font-bold text-gray-900">
                  ₹{pkg.price.toLocaleString()}
                </div>
                <div className="text-lg text-gray-500 line-through">
                  ₹{Math.round(pkg.price * 1.25).toLocaleString()}
                </div>
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                  20% OFF
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">Inclusive of all charges</p>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium">4.9</span>
                <span className="text-sm text-blue-600 hover:underline cursor-pointer">352 Reviews</span>
              </div>
              
              <div className="text-sm text-blue-600 hover:underline cursor-pointer mb-4">
                View More in this Category →
              </div>
            </div>

            {/* City Selection */}
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-gray-900">Select Your City</h3>
                <span className="text-purple-600 text-xs">📅 Date and Time will be taken in the next step</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">📍</span>
                  <span className="font-medium">{selectedCity}</span>
                </div>
                <div className="ml-auto flex items-center gap-2 text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm font-medium">Available</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-orange-700">
                  <span>🎯</span>
                  <span className="text-sm font-medium">Get ₹150 OFF - Only on Website Bookings</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  <span>💬</span>
                  WhatsApp Us
                </button>
                <button 
                  onClick={handleBookNow}
                  className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  {user ? 'Book Now →' : 'Login Now'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TABS SECTION ===== */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: 'inclusion', label: 'Package Inclusion' },
                { id: 'faqs', label: 'FAQs' },
                { id: 'delivery', label: 'Delivery Details' },
                { id: 'care', label: 'Care Info' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'inclusion' && (
              <div>
                <ul className="space-y-3">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'faqs' && (
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-medium mb-2">How long does setup take?</h4>
                  <p className="text-gray-600 text-sm">Our team typically takes 2-3 hours for complete setup depending on the package size.</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-medium mb-2">Can I customize the decorations?</h4>
                  <p className="text-gray-600 text-sm">Yes, we offer customization options. Please contact us to discuss your specific requirements.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'delivery' && (
              <div className="space-y-3">
                <p className="text-gray-700">• Setup will be done 2-3 hours before your event</p>
                <p className="text-gray-700">• Our team will handle complete installation</p>
                <p className="text-gray-700">• Cleanup service included after the event</p>
              </div>
            )}
            
            {activeTab === 'care' && (
              <div className="space-y-3">
                <p className="text-gray-700">• Handle decorative items with care</p>
                <p className="text-gray-700">• Keep away from direct heat sources</p>
                <p className="text-gray-700">• Our team will provide care instructions during setup</p>
              </div>
            )}
          </div>
        </div>

        {/* ===== RELATED PACKAGES ===== */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">More Event Packages</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPackages.map((relatedPkg) => (
              <div
                key={relatedPkg._id}
                onClick={() => navigate(`/package/${relatedPkg._id}`)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={relatedPkg.images?.[0] || "https://via.placeholder.com/300x200"}
                    alt={relatedPkg.title}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 line-clamp-2">
                    {relatedPkg.title}
                  </h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-gray-900">
                      ₹{relatedPkg.price.toLocaleString()}
                    </div>
                    <button className="text-pink-500 hover:text-pink-600 font-medium text-sm">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== BOOKING MODAL ===== */}
      {openBooking && (
        <BookingModal
          isOpen={openBooking}
          onClose={() => setOpenBooking(false)}
          package={pkg}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
