import { Product } from "../utils/Types";
import { ProductType } from "../utils/ProductType";
import { useNavigate } from "react-router-dom";

const shopping_cart: Product[] = [
  {
    id: 1,
    name: "Porto & Sicily Stickers",
    type: ProductType.Sticker,
    image: "http://localhost:5173/src/assets/images/products/houses.png",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 2.99,
    amount: 21,
  },
  {
    id: 2,
    name: '"Perfect Enough" t-shirt',
    type: ProductType.Shirt,
    image: "http://localhost:5173/src/assets/images/products/tshirt.png",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 2.99,
    amount: 21,
  },
];

const ShoppingCart = () => {
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return shopping_cart
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2);
  };

  return (
    <>
      {shopping_cart.length != 0 && (
        <div style={{ margin: "3.6rem 10% 9.6rem" }}>
          <h4 style={{ textAlign: "left", margin: "0 0 3.6rem" }}>
            Shopping Cart
          </h4>
          {shopping_cart.map((item) => (
            <li
              className="collection-item teal lighten-5"
              style={{
                listStyle: "none",
                padding: " 0.8rem 2.4rem",
                margin: "1.2rem 0",
                borderRadius: "1.2rem",
              }}
            >
              <div className="row" style={{ margin: "0" }}>
                <div className="left">
                  <div className="left">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "9.6rem" }}
                    />
                  </div>
                  <div
                    className="left"
                    style={{ textAlign: "left", margin: "0 2.4rem" }}
                  >
                    <h5>{item.name}</h5>
                    <p
                      className="title"
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: "Bold",
                        margin: "1.2rem 0 0",
                      }}
                    >
                      ${item.price}
                    </p>
                  </div>
                </div>
                <div className="right">
                  <div className="row">
                    <button
                      className="btn teal lighten-2"
                      style={{ margin: "3.6rem 0 0" }}
                    >
                      <i className="material-icons right">delete_forever</i>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
          <hr
            className="grey lighten-1"
            style={{ margin: "3.6rem 0 1.6rem" }}
          ></hr>
          <button
            className="btn-large right"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
          <h5
            className="right"
            style={{
              textAlign: "right",
              fontWeight: "bold",

              marginRight: "1.6rem",
            }}
          >
            Total: ${getTotalPrice()}
          </h5>
        </div>
      )}
      {shopping_cart.length == 0 && (
        <div>
          <h5 style={{ margin: "6.4rem 0 1.6rem" }}>Shopping cart is empty</h5>
          <a className="btn-flat" href="/">
            View Products
          </a>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
