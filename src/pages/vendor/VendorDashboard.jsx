import VendorSidebar from "../../pages/vendor/VendorSidebar";

const VendorDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <VendorSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">
          Welcome to Vendor Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500 text-sm">Total Packages</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500 text-sm">Total Bookings</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500 text-sm">Pending Requests</h3>
            <p className="text-3xl font-bold mt-2 text-orange-500">0</p>
          </div>

        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">
            Quick Info
          </h2>
          <p className="text-gray-600">
            Manage your profile, packages, and booking requests from here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
