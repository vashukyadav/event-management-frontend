import { useEffect, useState } from "react";
import VendorSidebar from "../../pages/vendor/VendorSidebar";
import api from "../../api/axois.js";

const VendorBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch vendor bookings
  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/vendor");
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔹 Accept / Reject booking
  const updateStatus = async (bookingId, status) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status });
      fetchBookings(); // refresh list
    } catch (error) {
      console.error(error);
      alert("Action failed");
    }
  };

  return (
    <div className="flex">
      <VendorSidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Booking Requests</h1>

        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found</p>
        ) : (
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Package</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-t">
                    <td className="p-3">
                      {booking.user?.name || "User"}
                    </td>
                    <td className="p-3">
                      {booking.package?.title}
                    </td>
                    <td className="p-3">
                      {new Date(booking.eventDate).toDateString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`font-semibold ${
                          booking.status === "pending"
                            ? "text-orange-500"
                            : booking.status === "accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {booking.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              updateStatus(booking._id, "accepted")
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              updateStatus(booking._id, "rejected")
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No Action
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorBookings;
