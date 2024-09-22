import { useLocation } from "react-router-dom";
import { Review } from "../utils/Types";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product;

  const reviews: Review[] = [
    {
      id: 1,
      comment: "very nice",
      rating: 5,
    },
    {
      id: 1,
      comment: "very nice",
      rating: 5,
    },
  ];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div style={{ margin: "6.4rem", textAlign: "left" }}>
      <div className="row">
        <div className="col m12 l6">
          <img
            src={`${window.location.origin}/src/assets/images/items/${product.img}`}
            alt={product.name}
            style={{ width: "100%" }}
          />
        </div>
        <div className="col m12 l5 offset-l1">
          <h3 style={{ marginBottom: "1.6rem" }}>{product.name}</h3>

          <div
            className="row"
            style={{ color: "#ffab00", margin: "0 0 2.4rem" }}
          >
            <div className="valign-wrapper">
              <i className="material-icons">star</i>
              <i className="material-icons">star</i>
              <i className="material-icons">star</i>
              <i className="material-icons">star</i>
              <i className="material-icons">star_border</i>
              <span style={{ marginLeft: "0.5rem", color: "black" }}>
                <i>5 ratings</i>
              </span>
            </div>
          </div>

          <p style={{ marginBottom: "6.4rem", fontSize: "1.2rem" }}>
            {product.descr}
          </p>
          <h4 style={{ marginBottom: "2.4rem" }}>
            <strong>${product.price.toFixed(2)}</strong>
          </h4>
          <button className="btn-large teal lighten-2">
            <i className="material-icons right">shopping_cart</i>Add to cart
          </button>
        </div>
      </div>
      {reviews.length > 0 && (
        <div style={{ margin: "2.4rem 0.8rem" }}>
          <hr />
          <h5 style={{ margin: "2.4rem 0" }}>Reviews</h5>
          {reviews.map((item) => (
            <li
              className="collection-item teal lighten-5"
              style={{
                listStyle: "none",
                padding: " 0.8rem 1.2rem",
                margin: "1.2rem 0",
                borderRadius: "1.2rem",
              }}
            >
              <div className="row" style={{ color: "#ffab00", margin: "0" }}>
                <i className="material-icons">star</i>
                <i className="material-icons">star</i>
                <i className="material-icons">star</i>
                <i className="material-icons">star</i>
                <i className="material-icons">star_border</i>
              </div>
              <p style={{ margin: "0.4rem 0 0" }}>{item.comment}</p>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
