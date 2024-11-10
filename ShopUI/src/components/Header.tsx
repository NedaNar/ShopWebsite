import { useAuth } from "../utils/AuthContext";

export default function Header() {
  const { user, logOut } = useAuth();

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
