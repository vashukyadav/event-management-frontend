import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axois";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    eventType: "",
    price: "",
    maxBudget: "",
    includes: ""
  });

  useEffect(() => {
    fetchPackage();
  }, [id]);

  const fetchPackage = async () => {
    try {
      const res = await api.get(`/packages/${id}`);
      const pkg = res.data.package;
      setFormData({
        title: pkg.title,
        eventType: pkg.eventType,
        price: pkg.price,
        maxBudget: pkg.maxBudget,
        includes: pkg.includes?.join(", ") || ""
      });
    } catch (error) {
      alert("Failed to load package");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/packages/${id}`, formData);
      alert("Package updated successfully!");
      navigate("/vendor-dashboard");
    } catch (error) {
      alert("Failed to update package");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Edit Package</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Title</label>
            <input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Event Type</label>
            <select
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Price (₹)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Max Budget (₹)</label>
            <input
              type="number"
              value={formData.maxBudget}
              onChange={(e) => setFormData({ ...formData, maxBudget: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Includes (comma separated)</label>
            <textarea
              value={formData.includes}
              onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
              className="w-full border p-2 rounded"
              rows="3"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Update Package
            </button>
            <button
              type="button"
              onClick={() => navigate("/vendor-dashboard")}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPackage;
