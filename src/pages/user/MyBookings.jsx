import { useEffect, useState } from "react";
import api from "../../api/axois.js";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/user");
      setBookings(res.data.bookings);
    } catch (error) {
      console.error(error);
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
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    {booking.packageId?.title}
                  </h2>
                  <p className="text-gray-600 capitalize">
                    {booking.packageId?.eventType} event
                  </p>
                  <p className="text-gray-500">
                    Vendor: {booking.vendorId?.businessName}
                  </p>
                  <p className="text-gray-500">
                    Date:{" "}
                    {new Date(booking.eventDate).toDateString()}
                  </p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <p className="mt-4 text-lg font-bold text-green-600">
                ₹{booking.totalAmount?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
