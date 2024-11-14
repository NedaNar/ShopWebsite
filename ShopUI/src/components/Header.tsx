import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import "./header.css";
import useSignalR from "../api/useSignalR";

export default function Header() {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const { user, logOut } = useAuth();

  const handleNotification = (message: string) => {
    setNotifications((prevNotifications) => [...prevNotifications, message]);
  };

  useSignalR({ onReceiveNotification: handleNotification });

  const toggleNotifications = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  const handleLogout = () => {
    logOut();
  };

  return (
    <nav>
      <div
        className="nav-wrapper blue-grey darken-2
      "
      >
        <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Neda's Shop
        </span>
        <ul className="left" style={{ marginLeft: "10%" }}>
          <li>
            <a href="/">Products</a>
          </li>
          {user && user.role === "admin" && (
            <li>
              <a href="/orders">Orders</a>
            </li>
          )}
        </ul>
        <ul className="right" style={{ marginRight: "10%" }}>
          {(!user || user.role === "user") && (
            <li>
              <a href="/cart">
                <i className="material-icons">shopping_cart</i>
              </a>
            </li>
          )}
          {user && (
            <li>
              <a href="/profile">
                <i className="material-icons">account_circle</i>
              </a>
            </li>
          )}
          {user && user.role === "admin" && (
            <li>
              <a onClick={toggleNotifications} style={{ position: "relative" }}>
                <i className="material-icons">notifications</i>

                <span className="notification_count">
                  {notifications.length}
                </span>
              </a>
              {isNotificationOpen && (
                <div className="notification-list">
                  {notifications.length === 0 && (
                    <span style={{ color: "black" }}>No new notifications</span>
                  )}
                  {notifications.length > 0 && (
                    <ul style={{ listStyleType: "none" }}>
                      {notifications.length > 0 &&
                        notifications.map((notification, index) => (
                          <li
                            key={index}
                            style={{
                              padding: "8px",
                              borderBottom: "1px solid #ddd",
                            }}
                          >
                            {notification}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          )}
          {user && (
            <li>
              <button className="btn-flat white-text" onClick={handleLogout}>
                LOG OUT
              </button>
            </li>
          )}
          {!user && (
            <li>
              <a href="/Signup">SIGN UP</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
