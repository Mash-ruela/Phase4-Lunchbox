import { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating"; // You'll need to create this component

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [stats, setStats] = useState({ average: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const user = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const [reviewsRes, statsRes] = await Promise.all([
          axios.get(`https://brembo.pythonanywhere.com/api/reviews/${productId}`),
          axios.get(`https://brembo.pythonanywhere.com/api/reviews/stats/${productId}`)
        ]);
        
        if (reviewsRes.data.success && statsRes.data.success) {
          setReviews(reviewsRes.data.reviews);
          setStats({
            average: statsRes.data.average_rating,
            count: statsRes.data.total_reviews
          });
        } else {
          setError("Failed to load reviews");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please sign in to leave a review.");
      return;
    }
    
    if (!reviewText.trim()) {
      alert("Please enter your review text.");
      return;
    }
    
    try {
      const newReview = {
        product_id: productId,
        user_id: user.user_id,
        content: reviewText,
        rating: rating
      };
      
      const res = await axios.post(
        "https://brembo.pythonanywhere.com/api/reviews", 
        newReview
      );
      
      if (res.data.success) {
        setReviews([res.data.review, ...reviews]);
        setReviewText("");
        setRating(5);
        
        // Update stats
        const newCount = stats.count + 1;
        const newAverage = ((stats.average * stats.count) + rating) / newCount;
        setStats({
          average: newAverage,
          count: newCount
        });
      } else {
        alert("Failed to submit review: " + (res.data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error submitting review: " + err.message);
    }
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <div className="reviews-section mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Product Reviews</h4>
        <div className="rating-summary">
          <StarRating rating={stats.average} editable={false} />
          <span className="ms-2">
            {stats.average.toFixed(1)} ({stats.count} reviews)
          </span>
        </div>
      </div>
      
      {user ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label className="form-label">Your Rating:</label>
            <StarRating 
              rating={rating} 
              editable={true} 
              onRatingChange={setRating}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Share your experience with this product..."
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>
      ) : (
        <div className="alert alert-info">
          Please sign in to leave a review.
        </div>
      )}
      
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="alert alert-warning">No reviews yet. Be the first to review!</div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">{review.username}</h5>
                  <div className="text-muted small">
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>
                <StarRating rating={review.rating} editable={false} />
                <p className="card-text mt-2">{review.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;