import { useCart } from "../utils/CartContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const navigate = useNavigate();

  const { cart, removeFromCart, addToCart, updateItemQuantity } = useCart();

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
            <li
              className="collection-item teal lighten-5"
              style={{
                listStyle: "none",
                padding: " 0.8rem 2.4rem",
                margin: "1.2rem 0",
                borderRadius: "1.2rem",
              }}
            >
              <div
                className="row valign-wrapper"
                style={{ margin: "0", width: "100%" }}
              >
                <div className="left">
                  <img
                    src={`${window.location.origin}/src/assets/images/items/${item.img}`}
                    alt={item.name}
                    style={{ width: "9.6rem" }}
                  />
                </div>
                <div
                  className="left"
                  style={{ textAlign: "left", margin: "0 2.4rem" }}
                >
                  <h5 style={{ margin: "0" }}>{item.name}</h5>
                  <p
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: "Bold",
                      margin: "0.4rem 0 0",
                    }}
                  >
                    ${item.price}
                  </p>
                </div>

                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="btn-small teal lighten-2"
                    onClick={() => addToCart(item)}
                  >
                    <i className="material-icons">add</i>
                  </button>
                  <p
                    style={{
                      width: "4rem",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      background: "#f5f5f5",
                      borderRadius: "4px",
                      margin: "0 0.5rem",
                      padding: "0.4rem",
                    }}
                  >
                    {item.quantity || 0}
                  </p>
                  <button
                    className="btn-small teal lighten-2"
                    style={{ margin: "0 2rem 0 0" }}
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateItemQuantity(item.id, item.quantity - 1);
                      } else {
                        removeFromCart(item.id);
                      }
                    }}
                  >
                    <i className="material-icons">remove</i>
                  </button>

                  <p
                    style={{
                      width: "5rem",
                      fontSize: "1.2rem",
                      textAlign: "right",
                      color: "#250000",
                    }}
                  >
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </li>
          ))}
          <hr
            className="grey lighten-1"
            style={{ margin: "3.6rem 0 1.6rem" }}
          ></hr>
          <button
            className="btn-large right"
            onClick={() => navigate("/checkout")}
          >
            Checkout
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
