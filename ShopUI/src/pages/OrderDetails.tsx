import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import M from "materialize-css"; // Import Materialize for initialization
import { Order, mockOrders } from "./Orders"; // Import Order type and mockOrders for demo

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the order ID from the URL params

  // Find the order based on the ID
  const order = mockOrders.find((order) => order.id === id);

  // Local state for managing the selected status
  const [status, setStatus] = useState(order?.status || "received");

  // Handle status change
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as Order["status"]);
    // In a real app, you would make an API call to update the status on the server here
  };

  // Initialize Materialize CSS select on component mount
  useEffect(() => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems); // Initialize Materialize select
  }, []);

  if (!order) {
    return <div className="container">Order not found</div>; // Fallback if order not found
  }

  return (
    <div className="container">
      <h1 className="center-align">Order Details</h1>

      <div className="card">
        <div className="card-content">
          <h2>Order ID: {order.id}</h2>
          <p>
            <strong>Customer Name:</strong> {order.customerName}{" "}
            {order.customerSurname}
          </p>
          <p>
            <strong>Address:</strong> {order.address}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Order Date:</strong> {order.orderDate}
          </p>
          <p>
            <strong>Total Amount:</strong> {order.totalAmount}
          </p>

          <div className="input-field">
            <strong>Status: </strong>
            <select value={status} onChange={handleStatusChange}>
              <option value="received">Received</option>
              <option value="preparing">Preparing</option>
              <option value="shipping">Shipping</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <h3 className="center-align">Items</h3>
      <ul className="collection">
        {order.items.map((item, index) => (
          <li key={index} className="collection-item">
            {item.name} - Quantity: {item.quantity} - Price: ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
