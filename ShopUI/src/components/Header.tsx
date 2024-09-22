export default function Header() {
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
          <li>
            <a href="/orders">Orders</a>
          </li>
        </ul>
        <ul className="right" style={{ marginRight: "10%" }}>
          <li>
            <a href="/cart">
              <i className="material-icons">shopping_cart</i>
            </a>
          </li>
          <li>
            <a href="/profile">
              <i className="material-icons">account_circle</i>
            </a>
          </li>
          <li>
            <a href="/Signup">SIGN UP</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
