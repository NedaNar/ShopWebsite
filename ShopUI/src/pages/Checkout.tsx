import { toast } from "react-toastify";
import { useCart } from "../utils/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleOrder = () => {
    clearCart();
    toast.success(`Order submitted successfully!`, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <div style={{ margin: "3.6rem 10% 9.6rem" }}>
      <h4
        style={{
          textAlign: "left",
          margin: "0 0 3.6rem",
          fontWeight: "bold",
        }}
      >
        Checkout
      </h4>
      <div className="row">
        <div className="col s7">
          <h5>Customer Information</h5>
          <form>
            <div className="input-field">
              <input
                type="email"
                id="email"
                disabled
                value="user@example.com"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input type="text" id="address" required />
              <label htmlFor="address">Address</label>
            </div>
            <div className="input-field">
              <input type="tel" id="phone" required />
              <label htmlFor="phone">Phone Number</label>
            </div>
            <button type="submit" className="btn green" onClick={handleOrder}>
              Proceed to Payment
            </button>
          </form>
        </div>

        <aside
          className="col s4 right"
          style={{
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
            padding: "2rem",
          }}
        >
          <p style={{ margin: "0 0 1.2rem", fontSize: "1.4rem" }}>
            Order Summary
          </p>
          <div>
            {cart.map((product) => (
              <div
                className="row"
                style={{ margin: "0.5rem 0" }}
                key={product.id}
              >
                <span className="left">{product.name}</span>
                <span className="left">&nbsp;&nbsp;×{product.quantity}</span>
                <span className="right">
                  ${(product.price * product.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <hr style={{ margin: "1rem 0" }} />
            <div className="total">
              <strong>Total: ${totalPrice.toFixed(2)}</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
