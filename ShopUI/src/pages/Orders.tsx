import React from "react";
import { useNavigate } from "react-router-dom";
import { useTable, Column, HeaderGroup, Row } from "react-table";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerSurname: string;
  address: string;
  paymentMethod: string;
  items: OrderItem[];
  orderDate: string;
  totalAmount: string;
  status: "received" | "preparing" | "shipping" | "completed";
}

export const mockOrders: Order[] = [
  {
    id: "1",
    customerName: "John",
    customerSurname: "Doe",
    address: "1234 Elm St, Springfield, USA",
    paymentMethod: "Credit Card",
    items: [
      { name: "Laptop", quantity: 1, price: 1000 },
      { name: "Mouse", quantity: 2, price: 50 },
    ],
    orderDate: "2023-09-10",
    totalAmount: "$1100.00",
    status: "received",
  },
  {
    id: "2",
    customerName: "Jane",
    customerSurname: "Smith",
    address: "5678 Oak Ave, Metropolis, USA",
    paymentMethod: "PayPal",
    items: [
      { name: "Smartphone", quantity: 1, price: 800 },
      { name: "Headphones", quantity: 1, price: 200 },
    ],
    orderDate: "2023-09-11",
    totalAmount: "$1000.00",
    status: "preparing",
  },
  {
    id: "3",
    customerName: "Alice",
    customerSurname: "Johnson",
    address: "9101 Pine Rd, Gotham, USA",
    paymentMethod: "Bank Transfer",
    items: [
      { name: "Tablet", quantity: 2, price: 300 },
      { name: "Stylus", quantity: 1, price: 50 },
    ],
    orderDate: "2023-09-12",
    totalAmount: "$650.00",
    status: "shipping",
  },
];

interface OrdersTableProps {
  data: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ data }) => {
  const navigate = useNavigate();

  const columns: Column<Order>[] = React.useMemo(
    () => [
      { Header: "Order ID", accessor: "id" },
      { Header: "Customer Name", accessor: "customerName" },
      { Header: "Order Date", accessor: "orderDate" },
      { Header: "Total Amount", accessor: "totalAmount" },
      { Header: "Status", accessor: "status" },
      {
        id: "actions",
        Cell: ({ row }: { row: Row<Order> }) => (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/orders/${row.original.id}`);
            }}
            className="btn-small waves-effect waves-light"
          >
            View Details
          </button>
        ),
      },
    ],
    [navigate]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Order>({
      columns,
      data,
    });

  return (
    <>
      <table {...getTableProps()} className="highlight">
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup<Order>) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: Row<Order>) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => navigate(`/orders/${row.original.id}`)}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const Orders = () => {
  return (
    <div style={{ margin: "3.6rem 10% 9.6rem" }}>
      <h4 style={{ textAlign: "left", margin: "0 0 3.6rem" }}>Orders</h4>
      <OrdersTable data={mockOrders} />
    </div>
  );
};

export default Orders;
