const Review = require("../model/Review");

// Get Pending Reviews (Admin)
exports.getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      approved: false,
    })
      .populate("user", "firstName lastName email")
      .populate("product", "title");

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Approve Review (Admin)
exports.approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        approved: true,
      },
      {
        new: true,
      },
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review approved successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
