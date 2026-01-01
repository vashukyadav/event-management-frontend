import { User, Package, Lock, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserSidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="w-64 border-r p-6">

      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
          {user?.name?.charAt(0)}
        </div>
        <p className="font-semibold">{user?.name}</p>
      </div>

      <SidebarItem
        icon={<User size={18} />}
        label="Account"
        active={activeTab === "account"}
        onClick={() => setActiveTab("account")}
      />

      <SidebarItem
        icon={<Package size={18} />}
        label="Orders"
        active={activeTab === "orders"}
        onClick={() => setActiveTab("orders")}
      />

      <SidebarItem
        icon={<Lock size={18} />}
        label="Change Password"
        active={activeTab === "password"}
        onClick={() => setActiveTab("password")}
      />

      <button
        onClick={logout}
        className="mt-6 flex items-center gap-2 text-red-600"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg mb-2 ${
      active
        ? "bg-pink-50 text-pink-600 border border-pink-500"
        : "hover:bg-gray-100"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default UserSidebar;
