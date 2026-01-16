import { useState } from "react";
import VendorSidebar from  "./VendorSidebar";
import VendorOverview from "./VendorOverview";
import VendorPackages from "./VendorPackages";
import VendorBookings from "./VendorBookings";
import VendorProfile from "./VendorProfile";

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-4">
          Home &gt; Vendor Dashboard &gt;{" "}
          <span className="text-pink-600 capitalize">
            {activeTab}
          </span>
        </p>

        <div className="bg-white rounded-xl shadow-sm flex overflow-hidden">

          {/* LEFT SIDEBAR */}
          <VendorSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* RIGHT CONTENT */}
          <div className="flex-1 p-8">
            {activeTab === "overview" && <VendorOverview />}
            {activeTab === "packages" && <VendorPackages />}
            {activeTab === "bookings" && <VendorBookings />}
            {activeTab === "profile" && <VendorProfile />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
