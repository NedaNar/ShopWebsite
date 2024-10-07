import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../api/useDataFetching";
import { Order } from "../api/apiModel";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const orders = useFetch<Order[]>(`Order/user/1`);

  return (
    <div style={{ margin: "3.6rem 10% 9.6rem" }}>
      <h4
        style={{
          textAlign: "left",
          margin: "0 0 3.6rem",
          fontWeight: "bold",
        }}
      >
        My Profile
      </h4>

      <div
        style={{
          backgroundColor: "#f1f1f1",
          borderRadius: "12px",
          padding: "2rem",
          textAlign: "left",
          fontSize: "1.2rem",
        }}
      >
        <p style={{ margin: "0 0 1.2rem", fontSize: "1.8rem" }}>
          Personal information
        </p>
        <p>Name Surname</p>
        <p>example@gmail.com</p>
        <div className="row">
          <button className="btn-small">Edit</button>{" "}
          <button className="btn-small">Save</button>
        </div>
      </div>

      {orders && orders.length > 0 && (
        <div>
          <p
            style={{
              margin: "3rem 0 1rem",
              fontSize: "1.8rem",
              textAlign: "left",
            }}
          >
            My orders
          </p>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() =>
                    navigate(`/orders/${order.id}`, {
                      state: { order },
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <td>{order.id}</td>
                  <td>
                    {new Date(order.orderDate).toLocaleDateString("lt-LT")}
                  </td>
                  <td>{order.totalPrice}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/orders/${order.id}`, {
                          state: { order },
                        });
                      }}
                      className="btn-small waves-effect waves-light"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
