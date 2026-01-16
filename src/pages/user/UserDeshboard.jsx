import { useState } from "react";
import UserSidebar from "./UserSidebar";
import UserOverview from "./UserOverview";
import AccountSettings from "./AccountSettings";
import UserOrders from "./UserOrders";
import ChangePassword from "./ChangePassword";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-4">
          Home &gt; Dashboard &gt;{" "}
          <span className="text-pink-600 capitalize">
            {activeTab}
          </span>
        </p>

        <div className="bg-white rounded-xl shadow-sm flex overflow-hidden">

          {/* LEFT */}
          <UserSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* RIGHT */}
          <div className="flex-1 p-8">
            {activeTab === "overview" && <UserOverview />}
            {activeTab === "account" && <AccountSettings />}
            {activeTab === "orders" && <UserOrders />}
            {activeTab === "password" && <ChangePassword />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
