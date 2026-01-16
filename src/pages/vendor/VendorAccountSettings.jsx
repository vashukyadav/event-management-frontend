import { useState, useContext } from "react";
import { Camera, Save } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const VendorAccountSettings = () => {
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    businessName: user?.businessName || "",
    address: user?.address || "",
    city: user?.city || "",
    description: user?.description || "",
    experience: user?.experience || "",
    specialization: user?.specialization || ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Updated vendor data:", formData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-pink-500 text-white flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0)}
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 bg-white border-2 border-gray-300 rounded-full p-1 hover:bg-gray-50"
            >
              <Camera size={16} />
            </button>
          </div>
          <div>
            <h3 className="font-medium">Profile Picture</h3>
            <p className="text-sm text-gray-600">Update your profile photo</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Experience (Years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Business Information */}
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="e.g., Wedding Decorations, Birthday Parties"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Business Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Tell customers about your business and services..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorAccountSettings;