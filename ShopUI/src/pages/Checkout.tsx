import { useCart } from "../utils/CartContext";
import { useEffect, useState } from "react";
import usePost from "../api/useDataPosting";
import { Order } from "../api/apiModel";
import { OrderStatus } from "../utils/OrderStatus";
import { useNavigate } from "react-router";
import { toastError, toastSuccess } from "../utils/toastUtils";
import { useAuth } from "../utils/AuthContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { user } = useAuth();

  const { responseData, error, postData } = usePost<Order>("Order");

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleOrder = (e: any) => {
    e.preventDefault();

    const orderData: Order = {
      totalPrice: totalPrice,
      address: address,
      phoneNumber: phone,
      orderDate: new Date().toISOString(),
      status: OrderStatus.Received,
      userId: user!.id,
      orderItems: cart.map((product) => ({
        quantity: product.quantity,
        itemId: product.id,
      })),
    };

    postData(orderData);
  };

  useEffect(() => {
    if (responseData) {
      clearCart();
      toastSuccess(`Order submitted successfully!`);
      navigate("/profile");
    }
  }, [responseData]);

  useEffect(() => {
    if (error) {
      toastError();
    }
  }, [error]);

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
          <h5 style={{ margin: "0 0 2.4rem" }}>Customer Information</h5>
          <form>
            <p
              style={{
                margin: "0 0 0.2rem",
                fontSize: "1.2rem",
                textAlign: "left",
              }}
            >
              {"Name Surname"}
            </p>
            <p
              style={{
                margin: "0 0 2rem",
                fontSize: "1.2rem",
                textAlign: "left",
                color: "#3A5C74",
              }}
            >
              {"example@email.com"}
            </p>
            <div className="input-field">
              <input
                type="text"
                id="address"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
              <label htmlFor="address">Address</label>
            </div>
            <div className="input-field">
              <input
                type="tel"
                id="phone"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="phone">Phone Number</label>
            </div>
            <button
              className="btn-large"
              onClick={handleOrder}
              disabled={!phone || !address}
            >
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
