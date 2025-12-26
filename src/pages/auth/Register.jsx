import { useState } from "react";
import { registerApi } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerApi({ ...form, role });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <select
          className="w-full border p-2 mb-3"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
        </select>

        {role === "user" ? (
          <>
            <input
              placeholder="Name"
              className="w-full border p-2 mb-3"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="City"
              className="w-full border p-2 mb-3"
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </>
        ) : (
          <>
            <input
              placeholder="Owner Name"
              className="w-full border p-2 mb-3"
              onChange={(e) =>
                setForm({ ...form, ownerName: e.target.value })
              }
            />
            <input
              placeholder="Business Name"
              className="w-full border p-2 mb-3"
              onChange={(e) =>
                setForm({ ...form, businessName: e.target.value })
              }
            />
          </>
        )}

        <input
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-green-600 text-white py-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
