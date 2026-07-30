import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

// Public Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MailVerification from "./pages/MailVerification";
import Offers from "./pages/Offers";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Blog from "./pages/Blog";
// User Pages
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";
import PaymentCancel from "./pages/PaymentCancel";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Contact from "./pages/Contact";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";

// 404
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Main Website */}

      <Route element={<MainLayout />}>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/verify-email/:token" element={<MailVerification />} />

        <Route path="/offers" element={<Offers />} />

        <Route path="/about" element={<About />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/blog" element={<Blog />} />

        <Route path="/contact" element={<Contact />} />

        {/* Protected User Routes */}

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/payment/success" element={<PaymentSuccess />} />

          <Route path="/payment/fail" element={<PaymentFail />} />

          <Route path="/payment/cancel" element={<PaymentCancel />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/orders/:id" element={<OrderDetails />} />
        </Route>
      </Route>

      {/* Admin Panel */}

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/admin/products" element={<AdminProducts />} />

          <Route path="/admin/users" element={<AdminUsers />} />

          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>
      </Route>

      {/* Not Found */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
