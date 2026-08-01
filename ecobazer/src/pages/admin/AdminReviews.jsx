import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Check, Star, User } from "lucide-react";

import { getPendingReviews, approveReview } from "../../services/reviewService";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const response = await getPendingReviews();

      setReviews(response.data.reviews || []);
    } catch (error) {
      console.log("Review loading error:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveReview(id);

      toast.success("Review approved successfully");

      fetchReviews();
    } catch (error) {
      console.log(error);
      toast.error("Failed to approve review");
    }
  };

  if (loading) {
    return <div className="p-6">Loading reviews...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Review Management</h1>

        <p className="text-sm text-gray-500 dark:text-gray-300">
          Approve customer reviews before showing them on homepage.
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="card-surface p-10 text-center">
          No pending reviews available.
        </div>
      ) : (
        <div className="grid gap-5">
          {reviews.map((review) => (
            <div key={review._id} className="card-surface p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-moss-100 flex items-center justify-center">
                  <User size={18} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {review.user?.firstName} {review.user?.lastName}
                  </h3>

                  <p className="text-sm text-gray-500">{review.user?.email}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="font-medium">Product:</p>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {review.product?.title}
                </p>
              </div>

              <div className="flex items-center gap-1 mb-3">
                <span className="font-medium">Rating:</span>

                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={
                      index < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <p className="mb-5 text-gray-700 dark:text-gray-200">
                "{review.comment}"
              </p>

              <button
                onClick={() => handleApprove(review._id)}
                className="btn-primary flex items-center gap-2"
              >
                <Check size={16} />
                Approve Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
