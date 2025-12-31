import { useState } from "react";
import api from "../../api/axois.js";
import toast from "react-hot-toast";

const BookingModal = ({ isOpen, onClose, package: pkg }) => {
  const [eventDate, setEventDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      toast.error("Please login to book this package");
      return;
    }

    try {
      setLoading(true);

      await api.post("/bookings", {
        packageId: pkg._id,
        eventDate,
      });

      toast.success("Booking request sent successfully!");
      onClose();
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Book Package</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <h3 className="font-semibold">{pkg.title}</h3>
        <p className="text-green-600 font-bold mb-4">
          ₹{pkg.price.toLocaleString()}
        </p>

        <form onSubmit={handleBooking}>
          <label className="block text-sm mb-2">Event Date</label>
          <input
            type="date"
            value={eventDate}
            min={today}
            onChange={(e) => setEventDate(e.target.value)}
            required
            className="w-full border p-2 rounded mb-4"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            >
              {loading ? "Booking..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
