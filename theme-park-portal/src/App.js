import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VisitorDashboard from "./pages/VisitorDashboard";
import RequireRole from "./components/RequireRole";

// Admin Pages
import AdminLayout from "./layouts/AdminLayout";  // NEW layout with sidebar
import Dashboard from "./pages/Dashboard";
import Businesses from "./pages/Businesses";
import PackagePage from "./pages/PackagePage";
import ProductsPage from "./pages/ProductsPage";
import Bookings from "./pages/Bookings";
import Customers from "./pages/Customers";
import Payments from "./pages/Payments";
import Analytics from "./pages/Analytics";
import Marketing from "./pages/Marketing";
import Settings from "./pages/Settings";

// SuperAdmin Pages
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import Dashboardd from "./pages/superadmin/Dashboard";
import Business from "./pages/superadmin/Businesses";
import Products from "./pages/superadmin/Products";
import BusinessDetails from "./pages/BusinessDetails";
import Layout from "./components/Layout/Layout";
import BookingPage from "./pages/BookingPage";
import Admin from "./pages/superadmin/Admins";
import Packages from "./pages/superadmin/Packages";
import Users from "./pages/superadmin/Users";
import Booking from "./pages/superadmin/Bookings";
import Payment from "./pages/superadmin/Payments";
import MyBookings from "./pages/MyBookings";
import Analyticss from "./pages/superadmin/Analytics";
import { ImageOff } from "lucide-react";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Dashboard Layout with nested routes */}
       <Route
  path="/admin/*"
  element={
    <RequireRole allowedRole="ADMIN">
      <Layout />
    </RequireRole>
  }
>
  <Route index element={<Dashboard />} />
  <Route path="business" element={<Businesses />} />
  <Route path="packages" element={<PackagePage />} />
  <Route path="products" element={<ProductsPage />} />
  <Route path="bookings" element={<Bookings />} />
  <Route path="customers" element={<Customers />} />
  <Route path="payments" element={<Payments />} />
  <Route path="analytics" element={<Analytics />} />
  <Route path="marketing" element={<Marketing />} />
  <Route path="settings" element={<Settings />} />
</Route>

<Route
  path="/visitor"
  element={
    <RequireRole allowedRole="VISITOR">
      <VisitorDashboard />
    </RequireRole>
  }
/>
  <Route path="/visitor/my-bookings" element={<MyBookings />} /> 

<Route path="/businesses/:id" element={<BusinessDetails />} /> 
<Route path="/booking/:packageId" element={<BookingPage />} />
<Route
  path="/superadmin/*"
  element={
    <RequireRole allowedRole="SUPER_ADMIN">
      <SuperAdminLayout />
    </RequireRole>
  }
>
  {/* Nested routes for SuperAdmin */}
  <Route index element={<Dashboardd />} />
  <Route path="businesses" element={<Business />} />
  <Route path="admins" element={<Admin />} />
  <Route path="products" element={<Products />} />
  <Route path="packages" element={<Packages />} />
  <Route path="users" element={<Users />} />
  <Route path="bookings" element={<Booking />} />
  <Route path="analytics" element={<Analyticss />} />
  <Route path="payments" element={<Payment />} />
 
</Route>

      </Routes>
    </Router>
  );
}

export default App;
