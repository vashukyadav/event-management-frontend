import { useState } from "react";
import { registerApi } from "../../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  console.log("✅ Register page rendered");
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Creating account...');
    
    try {
      console.log('Sending data:', { ...form, role });
      await registerApi({ ...form, role });
      
      toast.dismiss(loadingToast);
      toast.success('Account created successfully! Please login.');
      navigate("/login");
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Registration error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>

        <select
          className="w-full border border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
        </select>

        {role === "user" ? (
          <>
            <input
              placeholder="Name"
              className="w-full border border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="City"
              className="w-full border border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <input
              placeholder="Phone"
              className="w-full border border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </>
        ) : (
          <>
            <input
              placeholder="Owner Name"
              className="w-full border border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setForm({ ...form, ownerName: e.target.value })
              }
            />
            <input
              placeholder="Business Name"
              className="w-full border border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) =>
                setForm({ ...form, businessName: e.target.value })
              }
            />
          </>
        )}

        <input
          placeholder="Email"
          className="w-full border border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors mb-4">
          Register
        </button>
        
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
