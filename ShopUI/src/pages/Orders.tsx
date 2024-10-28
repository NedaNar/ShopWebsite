import useFetch from "../api/useDataFetching";
import { Order, UpdateOrderDTO } from "../api/apiModel";
import { OrderStatus } from "../utils/OrderStatus";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../utils/toastUtils";
import useUpdate from "../api/useDataUpdating";
import { useNavigate } from "react-router";
import useDelete from "../api/useDataDeleting";

const Orders = () => {
  const navigate = useNavigate();

  const fetchedOrders = useFetch<Order[]>(`Order`);
  const { deleteData, deleted } = useDelete<Order>();
  const { responseData, error, updateData } = useUpdate<UpdateOrderDTO>();

  const [orders, setOrders] = useState<Order[]>([]);
  const [toDeleteId, setToDeleteId] = useState<number | undefined>(undefined);

  const handleStatusChange = (status: OrderStatus, id?: number) => {
    updateData({ status }, `Order/${id}`);
  };

  const handleOrderDelete = (id?: number) => {
    setToDeleteId(id);
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }

    deleteData(`Order/${id}`);
  };

  useEffect(() => {
    if (fetchedOrders) {
      setOrders(fetchedOrders);
    }
  }, [fetchedOrders]);

  useEffect(() => {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }, [orders]);

  useEffect(() => {
    if (responseData) {
      toastSuccess(`Order status updated!`);
    }
  }, [responseData]);

  useEffect(() => {
    if (error) {
      toastError();
    }
  }, [error]);

  useEffect(() => {
    if (deleted) {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== toDeleteId)
      );
    }
  }, [deleted]);

  return (
    <div style={{ margin: "3.6rem 10% 9.6rem" }}>
      <h4
        style={{
          textAlign: "left",
          margin: "0 0 3.6rem",
          fontWeight: "bold",
        }}
      >
        Orders
      </h4>

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
          {orders?.map((order) => (
            <tr key={order.id} style={{ cursor: "pointer" }}>
              <td>{order.id}</td>
              <td>{new Date(order.orderDate).toLocaleDateString("lt-LT")}</td>
              <td>{order.totalPrice}</td>
              <td>
                <div className="input-field" style={{ marginRight: "2rem" }}>
                  <select
                    value={order.status.trim()}
                    onChange={(e) =>
                      handleStatusChange(
                        e.target.value as OrderStatus,
                        order.id
                      )
                    }
                  >
                    {Object.values(OrderStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <label>Order Status</label>
                </div>
              </td>
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
              <td>
                <button
                  className="btn red darken-4"
                  onClick={() => handleOrderDelete(order.id)}
                >
                  <i className="material-icons">delete_forever</i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
