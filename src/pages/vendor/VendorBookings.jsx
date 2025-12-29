import VendorSidebar from "../../pages/vendor/VendorSidebar";

const VendorBookings = () => {
  return (
    <div className="flex">
      <VendorSidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">
          Booking Requests
        </h1>

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
              {/* Booking Row */}
              <tr className="border-t">
                <td className="p-3">Rahul Sharma</td>
                <td className="p-3">Wedding Premium</td>
                <td className="p-3">20 Aug 2025</td>
                <td className="p-3">
                  <span className="text-orange-500 font-semibold">
                    Pending
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                    Accept
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">
                    Reject
                  </button>
                </td>
              </tr>

              {/* Accepted example */}
              <tr className="border-t">
                <td className="p-3">Amit Kumar</td>
                <td className="p-3">Birthday Decor</td>
                <td className="p-3">10 Sep 2025</td>
                <td className="p-3">
                  <span className="text-green-600 font-semibold">
                    Accepted
                  </span>
                </td>
                <td className="p-3 text-gray-400 text-sm">
                  No Action
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorBookings;
