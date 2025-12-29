import { useState } from "react";
import VendorSidebar from "../../pages/vendor/VendorSidebar";

const VendorProfile = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    businessName: "",
    city: "",
    experience: "",
    services: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔗 yahan baad me API connect hogi
    console.log("Vendor profile data:", formData);
  };

  return (
    <div className="flex">
      <VendorSidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Vendor Profile</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow max-w-xl"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Experience (years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Services (comma separated)
            </label>
            <input
              type="text"
              name="services"
              value={formData.services}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorProfile;
