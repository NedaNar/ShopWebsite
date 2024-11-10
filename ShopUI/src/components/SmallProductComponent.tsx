import { CartItem } from "../api/apiModel";
import { useCart } from "../utils/CartContext";
import { FALLBACK_IMAGE } from "../utils/imageUtils";

interface SmallProductComponentProps {
  item: CartItem;
}

const SmallProductComponent = ({ item }: SmallProductComponentProps) => {
  const { removeFromCart, addToCart, updateItemQuantity } = useCart();

  return (
    <li
      key={item.id}
      className="collection-item teal lighten-5"
      style={{
        listStyle: "none",
        padding: " 0.8rem 2.4rem",
        margin: "1.2rem 0",
        borderRadius: "1.2rem",
      }}
    >
      <div
        className="row valign-wrapper"
        style={{ margin: "0", width: "100%" }}
      >
        <div className="left">
          <img
            src={item.img}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
            alt={item.name}
            style={{ width: "9.6rem" }}
          />
        </div>
        <div className="left" style={{ textAlign: "left", margin: "0 2.4rem" }}>
          <h5 style={{ margin: "0" }}>{item.name}</h5>
          <p
            style={{
              fontSize: "1.6rem",
              fontWeight: "Bold",
              margin: "0.4rem 0 0",
            }}
          >
            ${item.price}
          </p>
        </div>

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            className="btn-small teal lighten-2"
            onClick={() => {
              if (item.quantity > 1) {
                updateItemQuantity(item.id!, item.quantity - 1);
              } else {
                removeFromCart(item.id!);
              }
            }}
          >
            <i className="material-icons">remove</i>
          </button>
          <p
            style={{
              width: "4rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
              background: "#f5f5f5",
              borderRadius: "4px",
              margin: "0 0.5rem",
              padding: "0.4rem",
            }}
          >
            {item.quantity || 0}
          </p>
          <button
            className="btn-small teal lighten-2"
            style={{ margin: "0 2rem 0 0" }}
            onClick={() => addToCart(item)}
          >
            <i className="material-icons">add</i>
          </button>

          <p
            style={{
              width: "5rem",
              fontSize: "1.2rem",
              textAlign: "right",
              color: "#250000",
            }}
          >
            ${(item.quantity * item.price).toFixed(2)}
          </p>
        </div>
      </div>
    </li>
  );
};

export default SmallProductComponent;
