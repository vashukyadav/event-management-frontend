import { useEffect, useState } from "react";
import api from "../../api/axois.js";
import VendorSidebar from "../vendor/VendorSidebar.jsx";

const VendorProfile = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    businessName: "",
    services: "",
    city: "",
    experience: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/vendors/profile");
      const vendor = res.data.vendor;

      setFormData({
        ownerName: vendor.ownerName || "",
        businessName: vendor.businessName || "",
        services: vendor.services?.join(", ") || "",
        city: vendor.city || "",
        experience: vendor.experience || "",
      });
    } catch (error) {
      console.error("Profile fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="flex">
      <VendorSidebar />

      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Vendor Profile</h1>

        <form className="bg-white p-6 rounded shadow max-w-xl">
          <input
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full border p-2 mb-3"
            placeholder="Owner Name"
          />

          <input
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full border p-2 mb-3"
            placeholder="Business Name"
          />

          <input
            name="services"
            value={formData.services}
            onChange={handleChange}
            className="w-full border p-2 mb-3"
            placeholder="Services (comma separated)"
          />

          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 mb-3"
            placeholder="City"
          />

          <input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border p-2 mb-3"
            placeholder="Experience (years)"
          />

          {/* Update button yahin rahegi */}
        </form>
      </div>
    </div>
  );
};

export default VendorProfile;
