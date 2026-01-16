import { useState, useEffect } from "react";
import api from "../../api/axois";

const VendorOverview = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    totalBookings: 0,
    pendingRequests: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [packagesRes, bookingsRes] = await Promise.all([
          api.get("/packages/vendor"),
          api.get("/bookings/vendor")
        ]);

        const packages = packagesRes.data.packages || [];
        const bookings = bookingsRes.data.bookings || [];
        const pending = bookings.filter(b => b.status === "pending");

        setStats({
          totalPackages: packages.length,
          totalBookings: bookings.length,
          pendingRequests: pending.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Welcome to Vendor Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-5 rounded-lg border">
          <h3 className="text-gray-500 text-sm">Total Packages</h3>
          <p className="text-3xl font-bold mt-2">
            {loading ? "..." : stats.totalPackages}
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border">
          <h3 className="text-gray-500 text-sm">Total Bookings</h3>
          <p className="text-3xl font-bold mt-2">
            {loading ? "..." : stats.totalBookings}
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border">
          <h3 className="text-gray-500 text-sm">Pending Requests</h3>
          <p className="text-3xl font-bold mt-2 text-orange-500">
            {loading ? "..." : stats.pendingRequests}
          </p>
        </div>

      </div>

      {/* QUICK INFO */}
      <div className="mt-8 bg-white p-6 rounded-lg border">
        <h2 className="text-lg font-semibold mb-2">
          Quick Info
        </h2>
        <p className="text-gray-600">
          Manage your profile, packages, and booking requests from here.
        </p>
      </div>
    </div>
  );
};

export default VendorOverview;
