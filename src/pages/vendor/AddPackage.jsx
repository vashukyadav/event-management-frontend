import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorSidebar from "../../pages/vendor/VendorSidebar";
import api from "../../api/axois";
import toast from "react-hot-toast";

const AddPackage = () => {
  const navigate = useNavigate(); // ✅ hook component ke andar

  const [formData, setFormData] = useState({
    title: "",
    eventType: "",
    price: "",
    maxBudget: "",
    includes: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Creating package...');

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("eventType", formData.eventType);
      data.append("price", formData.price);
      data.append("maxBudget", formData.maxBudget);
      data.append("includes", formData.includes);

      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      const response = await api.post("/packages", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.dismiss(loadingToast);
      console.log("Package created:", response.data);
      toast.success("Package created successfully!");
      navigate("/vendor/packages");

    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Package creation error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to create package. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <VendorSidebar />

      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Add New Package</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow max-w-xl"
        >
          <input
            type="text"
            name="title"
            placeholder="Package Title"
            className="w-full border p-2 mb-4"
            onChange={handleChange}
            required
          />

          <select
            name="eventType"
            className="w-full border p-2 mb-4"
            onChange={handleChange}
            required
          >
            <option value="">Select Event Type</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="engagement">Engagement</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full border p-2 mb-4"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="maxBudget"
            placeholder="Max Budget"
            className="w-full border p-2 mb-4"
            onChange={handleChange}
          />

          <input
            type="text"
            name="includes"
            placeholder="Includes (comma separated)"
            className="w-full border p-2 mb-4"
            onChange={handleChange}
          />

          <input
            type="file"
            multiple
            className="mb-6"
            onChange={handleImageChange}
          />

          <button
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Creating..." : "Create Package"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
