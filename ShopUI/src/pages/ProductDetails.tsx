import { useLocation } from "react-router-dom";
import useFetch from "../api/useDataFetching";
import { Rating } from "../api/apiModel";
import StarRating from "../components/StarRating";
import { useCart } from "../utils/CartContext";
import useDelete from "../api/useDataDeleting";
import { useEffect, useState } from "react";
import { FALLBACK_IMAGE } from "../utils/imageUtils";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product;

  const { addToCart } = useCart();
  const { deleteData, deleted } = useDelete<Rating>();
  const fetchedRatings = useFetch<Rating[]>(`Rating/item/${product.id}`);

  const [ratings, setRatings] = useState<Rating[]>([]);
  const [toDeleteId, setToDeleteId] = useState<number | undefined>(undefined);

  const getAverageRating = (reviews: Rating[]) => {
    const total = reviews.reduce((sum, review) => sum + review.itemRating, 0);
    return Math.round(total / reviews.length);
  };

  const handleReviewDelete = (id?: number) => {
    setToDeleteId(id);
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }

    deleteData(`Rating/${id}`);
  };

  useEffect(() => {
    if (fetchedRatings) {
      setRatings(fetchedRatings);
    }
  }, [fetchedRatings]);

  useEffect(() => {
    if (deleted) {
      setRatings((prevRatings) =>
        prevRatings.filter((rating) => rating.id !== toDeleteId)
      );
    }
  }, [deleted]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div style={{ margin: "6.4rem", textAlign: "left" }}>
      <div className="row">
        <div className="col m12 l6">
          <img
            src={product.img}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
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
            {ratings && ratings.length > 0 && (
              <div className="valign-wrapper">
                <StarRating initialRating={getAverageRating(ratings)} />
                <span style={{ marginLeft: "0.5rem", color: "black" }}>
                  <i>{ratings.length} ratings</i>
                </span>
              </div>
            )}
            {(!ratings || ratings.length === 0) && (
              <span style={{ marginLeft: "0.5rem", color: "black" }}>
                <i>No ratings yet</i>
              </span>
            )}
          </div>

          <p style={{ marginBottom: "6.4rem", fontSize: "1.2rem" }}>
            {product.descr}
          </p>
          <h4 style={{ marginBottom: "2.4rem" }}>
            <strong>${product.price.toFixed(2)}</strong>
          </h4>
          <button
            className="btn-large teal lighten-2"
            disabled={product.itemCount <= 0}
            onClick={() => addToCart(product, true)}
          >
            <i className="material-icons right">shopping_cart</i>Add to cart
          </button>
        </div>
      </div>
      {ratings && ratings.length > 0 && (
        <div style={{ margin: "2.4rem 0.8rem" }}>
          <hr />
          <h5 style={{ margin: "2.4rem 0" }}>Reviews</h5>
          {ratings.map((rating, index) => (
            <li
              key={index}
              className="collection-item teal lighten-5"
              style={{
                listStyle: "none",
                padding: " 0.8rem 1.2rem",
                margin: "1.2rem 0",
                borderRadius: "1.2rem",
              }}
            >
              <div className="row valign-wrapper" style={{ margin: 0 }}>
                <div className="col l11">
                  <StarRating initialRating={rating.itemRating} />
                  <p style={{ margin: "0.4rem 0 0" }}>{rating.comment}</p>
                </div>
                <div className="col l1">
                  <button
                    className="btn red darken-4"
                    onClick={() => handleReviewDelete(rating.id)}
                  >
                    <i className="material-icons">delete_forever</i>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
