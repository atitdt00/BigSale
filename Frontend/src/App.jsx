import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard";
import Categories from "./pages/Admin/Categories";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
import Esewa from "./Services/PaymentMethod";
import Success from "./Services/Success";
import Failure from "./Services/Failure";
import CartContainer from "./pages/CartContainer";
import { ToastContainer } from "react-toastify";
import ProtectRoute from "./Routes/ProtectRoute";
import AdminRoute from "./Routes/AdminRoute";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />

        <Route element={<ProtectRoute />}>
          <Route path="/esewa" element={<Esewa />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/cart" element={<CartContainer />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
