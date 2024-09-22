import React, { useState } from "react";
import M from "materialize-css"; // Import Materialize for initialization

const CheckoutPage: React.FC = () => {
  // Local state for form fields
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [items, setItems] = useState("");

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you'd handle form submission here (e.g., send data to an API)
    console.log("Order Submitted", { name, address, paymentMethod, items });
  };

  // Initialize Materialize CSS components
  React.useEffect(() => {
    M.AutoInit(); // Initialize all Materialize CSS components
  }, []);

  return (
    <div className="container">
      <h1 className="center-align">Checkout</h1>
      <div className="card">
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="name">Name</label>
            </div>

            <div className="input-field">
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <label htmlFor="address">Address</label>
            </div>

            <div className="input-field">
              <select
                id="payment-method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="" disabled>
                  Choose your payment method
                </option>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bankTransfer">Bank Transfer</option>
              </select>
              <label htmlFor="payment-method">Payment Method</label>
            </div>

            <div className="input-field">
              <textarea
                id="items"
                className="materialize-textarea"
                value={items}
                onChange={(e) => setItems(e.target.value)}
                required
              />
              <label htmlFor="items">
                Items (e.g., List of items or description)
              </label>
            </div>

            <div className="center-align">
              <button type="submit" className="btn waves-effect waves-light">
                Submit Order
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
