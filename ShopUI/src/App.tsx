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
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <ScrollToTop />
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute requiredRole={"user"}>
                    <ShoppingCart />
                  </ProtectedRoute>
                }
              />
              <Route path="/orders" element={<Orders />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute loggedIn={true} requiredRole="user">
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders/:id"
                element={
                  <ProtectedRoute loggedIn={true}>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute loggedIn={true} requiredRole="user">
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <ProtectedRoute loggedIn={false}>
                    <Signup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectedRoute loggedIn={false}>
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute loggedIn={true} requiredRole="user">
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Home />} />
            </Routes>
          </CartProvider>
        </BrowserRouter>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
