import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import UserProfile from "./pages/UserProfile";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OrderDetails from "./pages/OrderDetails";
import CheckoutPage from "./pages/Checkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./utils/CartContext";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <>
      <ToastContainer limit={1} />
      <Header />
      <BrowserRouter>
        <ScrollToTop />
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
