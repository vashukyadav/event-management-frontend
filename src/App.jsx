import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MyBookings from "./pages/user/MyBookings";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import UserHome from "./pages/user/UserHome";
import UserDashboard from "./pages/user/UserDeshboard";
import VendorPackages from "./pages/vendor/VendorPackages";
import VendorBookings from "./pages/vendor/VendorBookings";
import VendorProfile from "./pages/vendor/VendorProfile";
import AddPackage from "./pages/vendor/AddPackage";
import PublicEvents from "./pages/public/PublicEvents";
import CartPage from "./pages/cart/Cart";
import Contact from "./components/common/Contact";

import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./layouts/Layout";
import ProductDetailPage from "./pages/public/ProductDetailPage";
function App() {
  return (
    <Routes>

      {/* 🔓 WITHOUT NAVBAR & FOOTER */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🌐 WITH NAVBAR & FOOTER */}
      <Route element={<Layout />}>

        {/* Public */}
        <Route path="/" element={<PublicEvents />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />

        {/* User */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/package/:id"
          element={<ProductDetailPage />}
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

        <Route
          path="/user/orders"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* Vendor */}
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

      </Route>
    </Routes>
  );
}

export default App;
