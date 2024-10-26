import { useEffect, useState } from "react";
import { OrderItem, Rating } from "../api/apiModel";
import { OrderStatus } from "../utils/OrderStatus";
import StarRating from "./StarRating";
import usePost from "../api/useDataPosting";
import { toastError, toastSuccess } from "../utils/toastUtils";
import useFetch from "../api/useDataFetching";

interface OrderDetailsComponentProps {
  orderItem: OrderItem;
  orderStatus: OrderStatus;
}

const OrderDetailsComponent = ({
  orderStatus,
  orderItem,
}: OrderDetailsComponentProps) => {
  const [ratingNumber, setRatingNumber] = useState(0);
  const [review, setReview] = useState("");
  const [hasRating, setHasRating] = useState(false);

  const { responseData, error, postData } = usePost<Rating>("Rating");

  const rating = useFetch<Rating>(`Rating/item/${orderItem.item!.id}/user/1`);

  const handleRatingChange = (newRating: number) => {
    setRatingNumber(newRating);
  };

  useEffect(() => {
    if (rating) {
      setHasRating(true);
    }
  }, [rating]);

  useEffect(() => {
    if (responseData) {
      setHasRating(true);
      toastSuccess(`Rating submitted!`);
    }
  }, [responseData]);

  useEffect(() => {
    if (error) {
      toastError();
    }
  }, [error]);

  const submitReview = (e: any) => {
    e.preventDefault();
    postData({
      comment: review,
      itemRating: ratingNumber,
      userId: 1,
      itemId: orderItem.item!.id!,
    });
  };

  return (
    <div>
      {orderItem.item && (
        <li
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
                src={
                  orderItem.item.img
                    ? `${window.location.origin}/src/assets/images/items/${orderItem.item.img}`
                    : `${window.location.origin}/src/assets/images/items/none.png`
                }
                style={{ width: "6.4rem" }}
              />
            </div>
            <div className="left" style={{ margin: "0 2.4rem" }}>
              <h5 style={{ margin: "0" }}>{orderItem.item.name}</h5>
              <p
                style={{
                  fontSize: "1.6rem",
                  fontWeight: "Bold",
                  margin: "0.4rem 0 0",
                }}
              >
                ${orderItem.item?.price}
              </p>
            </div>

            <div style={{ marginLeft: "auto", display: "flex" }}>
              <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                ×{orderItem.quantity}
              </p>

              <p
                style={{
                  width: "5rem",
                  fontSize: "1.2rem",
                  textAlign: "right",
                  color: "#250000",
                }}
              >
                ${(orderItem.quantity * orderItem.item.price).toFixed(2)}
              </p>
            </div>
          </div>

          {orderStatus.trim() == OrderStatus.Received && !hasRating && (
            <div className="row">
              <p style={{ fontWeight: "bold", margin: "1.6rem 0 0.6rem" }}>
                Leave a review
              </p>
              <form
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "1rem",
                }}
              >
                <StarRating
                  initialRating={ratingNumber}
                  clickable
                  onRatingChange={handleRatingChange}
                />
                <div className="input-field">
                  <textarea
                    id="textarea"
                    className="materialize-textarea"
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                  <label htmlFor="textarea">Review</label>
                </div>
                <button
                  disabled={!review || ratingNumber === 0}
                  onClick={submitReview}
                  className="btn-small"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
          {hasRating && <p>We received you review! Thank you!</p>}
        </li>
      )}
    </div>
  );
};

export default OrderDetailsComponent;
