import { Link } from "react-router-dom";
import VendorSidebar from "../../pages/vendor/VendorSidebar";

const VendorPackages = () => {
  return (
    <div className="flex">
      <VendorSidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Packages</h1>

          {/* ✅ Add Package Button */}
          <Link
            to="/vendor/add-package"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Package
          </Link>
        </div>

        {/* Packages list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* package cards */}
        </div>
      </div>
    </div>
  );
};

export default VendorPackages;
