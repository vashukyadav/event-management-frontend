// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between">
//       <Link to="/" className="font-bold text-lg hover:text-gray-300">Event Manager</Link>

//       <div className="flex gap-4 items-center">
//         <Link to="/" className="hover:text-gray-300">Events</Link>

//         {!user && (
//           <>
//             <Link to="/login" className="hover:text-gray-300">Login</Link>
//             <Link to="/register" className="hover:text-gray-300">Register</Link>
//           </>
//         )}

//         {user?.role === "user" && (
//           <>
//             <Link to="/user/dashboard" className="hover:text-gray-300">Dashboard</Link>
//             <Link to="/my-bookings" className="hover:text-gray-300">My Bookings</Link>
//             <button onClick={logout} className="hover:text-gray-300">Logout</button>
//           </>
//         )}

//         {user?.role === "vendor" && (
//           <>
//             <Link to="/vendor/dashboard" className="hover:text-gray-300">Dashboard</Link>
//             <Link to="/vendor/packages" className="hover:text-gray-300">My Packages</Link>
//             <Link to="/vendor/bookings" className="hover:text-gray-300">Bookings</Link>
//             <button onClick={logout} className="hover:text-gray-300">Logout</button>
//           </>
//         )}

//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  Phone,
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import CityModal from "./CityModal";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "../../context/LocationContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { selectedCity, setSelectedCity } = useLocation();

  const [openCityModal, setOpenCityModal] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <>
      <nav className="w-full bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center">

          {/* 🔴 LEFT SECTION */}
          <div className="flex items-center gap-6 shrink-0">
            <div
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-pink-600 cursor-pointer"
            >
              balloondekor
            </div>

            <div
              onClick={() => setOpenCityModal(true)}
              className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-pink-600"
            >
              <MapPin size={18} className="text-pink-600" />
              <span className="font-medium">{selectedCity}</span>
            </div>
          </div>

          {/* 🔍 CENTER SECTION */}
          <div className="flex-1 flex justify-center px-8">
            <div className="w-full max-w-xl relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search for decorations..."
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
          </div>

          {/* 👉 RIGHT SECTION */}
          <div className="flex items-center gap-8 shrink-0 text-gray-700">

            {/* CONTACT */}
            <div
              onClick={() => navigate("/contact")}
              className="flex flex-col items-center cursor-pointer hover:text-pink-600"
            >
              <Phone size={20} />
              <span className="text-xs">Contact</span>
            </div>

            {/* CART */}
            <div
              onClick={() => navigate("/cart")}
              className="flex flex-col items-center cursor-pointer hover:text-pink-600"
            >
              <ShoppingCart size={20} />
              <span className="text-xs">Cart</span>
            </div>

            {/* AUTH */}
            {!user ? (
              <div
                onClick={() => navigate("/login")}
                className="flex flex-col items-center cursor-pointer hover:text-pink-600"
              >
                <User size={20} />
                <span className="text-xs">Signup</span>
              </div>
            ) : (
              <div className="relative">
                <div
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  className="h-9 w-9 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold cursor-pointer"
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                {openUserMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                    <div
                      onClick={() => {
                        setOpenUserMenu(false);
                        user.role === "vendor"
                          ? navigate("/vendor/dashboard")
                          : navigate("/user/dashboard");
                      }}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </div>

                    <div
                      onClick={() => {
                        setOpenUserMenu(false);
                        logout();
                        navigate("/login");
                      }}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                    >
                      <LogOut size={16} />
                      Logout
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* CITY MODAL */}
      <CityModal
        isOpen={openCityModal}
        onClose={() => setOpenCityModal(false)}
        onSelect={(city) => setSelectedCity(city)}
      />
    </>
  );
};

export default Navbar;


