import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminPrivateRoute, AdminAuthRoute } from "./utils/PrivateRoute";
import { PublicRoute, AuthRoute } from "./utils/PublicRoute";

// Client
import Home from "./pages/frontend/Home/Home";
import Login from "./pages/frontend/Auth/Login";
import SignUp from "./pages/frontend/Auth/SignUp";
import ProuductPage from "./pages/frontend/Shop/ProuductPage";
import Shop from "./pages/frontend/Shop/Shop";

// Admin
import AdminLogin from "./pages/backend/Login/Login";
import Dashboard from "./pages/backend/Dashboard/Dashboard";
import Customer from "./pages/backend/Customer/Customer";
import Category from "./pages/backend/Category/Category";
import Brands from "./pages/backend/Brands/Brands";
import Products from "./pages/backend/Products/Products";
import AddProduct from "./pages/backend/Products/AddProduct";
import Orders from "./pages/backend/Orders/Orders";
import EditProduct from "./pages/backend/Products/EditProduct";
import Variants from "./pages/backend/Variants/Variants";
import AddVariant from "./pages/backend/Variants/AddVariant";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/:name" element={<ProuductPage />} />

          <Route element={<AuthRoute />}></Route>

          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/customers" element={<Customer />} />
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/brands" element={<Brands />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/products/add" element={<AddProduct />} />
            <Route path="/admin/products/:id" element={<EditProduct />} />
            <Route path="/admin/products/:slug/:id" element={<Variants />} />
            <Route
              path="/admin/products/:slug/:id/add"
              element={<AddVariant />}
            />
            <Route path="/admin/orders" element={<Orders />} />
          </Route>

          <Route element={<AdminAuthRoute />}>
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
