import { useState } from "react";
import api from "../../api/axois";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await api.put("/users/change-password", formData);
      alert("Password updated successfully!");
      setFormData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <input
            type="password"
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
