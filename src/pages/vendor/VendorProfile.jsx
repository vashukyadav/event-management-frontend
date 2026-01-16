import { useEffect, useState } from "react";
import api from "../../api/axois.js";

const VendorProfile = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    businessName: "",
    services: "",
    city: "",
    experience: "",
  });
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/vendors/profile");
      const vendor = res.data.vendor;
      console.log("Vendor data:", vendor);

      setEmail(vendor.email || "");
      setRole(vendor.role || "vendor");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await api.put("/vendors/profile", formData);
      alert("Profile updated successfully!");
      fetchProfile();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vendor Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-xl">
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            value={email || "Not provided"}
            disabled
            className="w-full border p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Role</label>
          <input
            value={role || "vendor"}
            disabled
            className="w-full border p-2 bg-gray-100 cursor-not-allowed capitalize"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Owner Name</label>
          <input
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full border p-2"
            placeholder="Enter owner name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Business Name</label>
          <input
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full border p-2"
            placeholder="Enter business name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Services</label>
          <input
            name="services"
            value={formData.services}
            onChange={handleChange}
            className="w-full border p-2"
            placeholder="e.g., Catering, Decoration, Photography"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2"
            placeholder="Enter city"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Experience (years)</label>
          <input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border p-2"
            placeholder="Enter years of experience"
            type="number"
            min="0"
          />
        </div>

        <button
          type="submit"
          disabled={updating}
          className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 disabled:bg-gray-400"
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default VendorProfile;
