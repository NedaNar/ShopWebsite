import { Item, Order } from "../api/apiModel";
import { useLocation } from "react-router-dom";
import useFetch from "../api/useDataFetching";
import StarRating from "../components/StarRating";
import { OrderStatus } from "../utils/OrderStatus";
import OrderDetailsComponent from "../components/OrderDetailsComponent";

const OrderDetails = () => {
  const location = useLocation();
  const order: Order = location.state?.order;

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <>
      <div style={{ margin: "3.6rem 10% 9.6rem", textAlign: "left" }}>
        <h4 style={{ margin: "0 0 0.4rem", fontWeight: "bold" }}>
          Order details
        </h4>
        <div>
          <p style={{ margin: "0" }}>Order #{order.id}</p>
          <p style={{ margin: "1.3rem 0 1.2rem", fontSize: "1.2rem" }}>
            Status: {order.status.toUpperCase()}
          </p>
        </div>
        {order.orderItems.map((orderItem) => (
          <OrderDetailsComponent
            orderStatus={order.status}
            orderItem={orderItem}
          />
        ))}
        <hr
          className="grey lighten-1"
          style={{ margin: "1.2rem 0 1.6rem" }}
        ></hr>
        <h5
          className="right"
          style={{ fontWeight: "bold", marginRight: "1.6rem" }}
        >
          Total: ${order.totalPrice}
        </h5>
      </div>
    </>
  );
};

export default OrderDetails;
