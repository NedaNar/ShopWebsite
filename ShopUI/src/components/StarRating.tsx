interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <i key={i} className="material-icons">
          star
        </i>
      );
    } else {
      stars.push(
        <i key={i} className="material-icons">
          star_border
        </i>
      );
    }
  }

  return (
    <div className="row" style={{ color: "#ffab00", margin: "0" }}>
      {stars}
    </div>
  );
};

export default StarRating;
