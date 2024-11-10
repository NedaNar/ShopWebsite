import SmallProductComponent from "../components/SmallProductComponent";
import { useAuth } from "../utils/AuthContext";
import { useCart } from "../utils/CartContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { cart } = useCart();

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      {cart.length != 0 && (
        <div style={{ margin: "3.6rem 10% 9.6rem" }}>
          <h4
            style={{
              textAlign: "left",
              margin: "0 0 3.6rem",
              fontWeight: "bold",
            }}
          >
            Shopping Cart
          </h4>
          {cart.map((item) => (
            <SmallProductComponent item={item} key={item.id} />
          ))}
          <hr
            className="grey lighten-1"
            style={{ margin: "3.6rem 0 1.6rem" }}
          ></hr>
          <button
            className="btn-large right"
            onClick={() => navigate("/checkout")}
            disabled={!user}
          >
            {!user ? "Login to proceed" : "Checkout"}
          </button>
          <h5
            className="right"
            style={{
              textAlign: "right",
              fontWeight: "bold",

              marginRight: "1.6rem",
            }}
          >
            Total: ${getTotalPrice()}
          </h5>
        </div>
      )}
      {(!cart || cart.length == 0) && (
        <div>
          <h5 style={{ margin: "6.4rem 0 1.6rem" }}>Shopping cart is empty</h5>
          <a className="btn-flat" href="/">
            View Products
          </a>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
