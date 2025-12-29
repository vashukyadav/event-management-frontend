import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MyBookings from "./pages/user/MyBookings";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import UserHome from "./pages/user/UserHome";
import UserDashboard from "./pages/user/UserDeshboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import VendorPackages from "./pages/vendor/VendorPackages";
import VendorBookings from "./pages/vendor/VendorBookings";
import VendorProfile from "./pages/vendor/VendorProfile";
import AddPackage from "./pages/vendor/AddPackage";
import PublicEvents from "./pages/public/PublicEvents";
import Navbar from "./components/common/Navbar";


function App() {
  return (
    <>
      <Navbar />
      <Routes>

      {/* Public Routes */}
      <Route path="/" element={<PublicEvents />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Routes */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/home"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <MyBookings />
          </ProtectedRoute>
        }
      />

      {/* Vendor Routes */}
      <Route
        path="/vendor/dashboard"
        element={
          <ProtectedRoute allowedRoles={["vendor"]}>
            <VendorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vendor/packages"
        element={
          <ProtectedRoute allowedRoles={["vendor"]}>
            <VendorPackages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vendor/profile"
        element={
          <ProtectedRoute allowedRoles={["vendor"]}>
            <VendorProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/bookings"
        element={
          <ProtectedRoute allowedRoles={["vendor"]}>
            <VendorBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/add-package"
        element={
          <ProtectedRoute allowedRoles={["vendor"]}>
            <AddPackage />
          </ProtectedRoute>
        }
      />
      </Routes>
    </>
  );
}

export default App;
