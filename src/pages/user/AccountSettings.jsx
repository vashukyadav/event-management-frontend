import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const AccountSettings = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔜 future: API call here
    console.log("Updated Data:", formData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full border rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={4}
              placeholder="Enter your address"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between mt-8">
          <button
            type="reset"
            onClick={() =>
              setFormData({
                name: user?.name || "",
                email: user?.email || "",
                phone: "",
                address: "",
              })
            }
            className="px-6 py-2 border rounded-lg"
          >
            Reset
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
