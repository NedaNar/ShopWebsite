import React from "react";
import { useTable, Column, Row } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import { Order, mockOrders } from "./Orders"; // Import Order type and mockOrders for demo

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  // Sample user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    address: "1234 Elm St, Springfield, USA",
  };

  // Filter orders for the sample user
  const userOrders = mockOrders.filter(
    (order) => order.customerName === "John"
  );

  // Define columns for react-table
  const columns: Column<Order>[] = React.useMemo(
    () => [
      { Header: "Order ID", accessor: "id" },
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
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: userOrders,
    });

  return (
    <div className="container">
      <h1 className="center-align">User Profile</h1>

      <div className="card">
        <div className="card-content">
          <h2>Personal Information</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <h2>My Orders</h2>
          {userOrders.length > 0 ? (
            <table {...getTableProps()} className="highlight">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      onClick={() => navigate(`/orders/${row.original.id}`)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
