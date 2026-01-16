import { useEffect, useState } from "react";
import api from "../../api/axois.js";

const UserOrders = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/user");
      // Sort bookings by creation date (newest first)
      const sortedBookings = (res.data.bookings || []).sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBookings(sortedBookings);
    } catch (error) {
      console.error("Fetch bookings error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending Approval";
      case "accepted":
        return "Confirmed";
      case "rejected":
        return "Rejected";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
        <div className="text-sm text-gray-500">
          Total Orders: {bookings.length}
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-gray-500 text-lg mb-2">No orders found</p>
          <p className="text-gray-400">Start booking packages to see your order history</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {booking.packageId?.title || "Package"}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                        getStatusColor(booking.status)
                      }`}
                    >
                      {getStatusText(booking.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="mb-1">
                        <span className="font-medium">Event Type:</span> {booking.packageId?.eventType || 'N/A'}
                      </p>
                      <p className="mb-1">
                        <span className="font-medium">Vendor:</span> {booking.vendorId?.businessName || "N/A"}
                      </p>
                      <p className="mb-1">
                        <span className="font-medium">Event Date:</span> {new Date(booking.eventDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1">
                        <span className="font-medium">Event Time:</span> {booking.eventTime || 'N/A'}
                      </p>
                      <p className="mb-1">
                        <span className="font-medium">Quantity:</span> {booking.quantity || 1}
                      </p>
                      <p className="mb-1">
                        <span className="font-medium">Booked On:</span> {new Date(booking.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    ₹{booking.totalAmount?.toLocaleString() || booking.packageId?.price?.toLocaleString()}
                  </div>
                  {booking.paymentPercentage && (
                    <div className="text-sm text-gray-500">
                      {booking.paymentPercentage}% Payment
                    </div>
                  )}
                </div>
              </div>
              
              {/* Status specific messages */}
              {booking.status === 'pending' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                  <p className="text-yellow-700 text-sm">
                    🕰️ Your booking is under review. The vendor will confirm within 24 hours.
                  </p>
                </div>
              )}
              
              {booking.status === 'accepted' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                  <p className="text-green-700 text-sm">
                    ✅ Great! Your booking has been confirmed. The vendor will contact you soon.
                  </p>
                </div>
              )}
              
              {booking.status === 'rejected' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                  <p className="text-red-700 text-sm">
                    ❌ Sorry, this booking was not accepted. Please try booking another package.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;