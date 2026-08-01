const Review = require("../model/Review");
const Product = require("../model/productModel");

// Create Review
exports.createReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    const user = req.user.id;

    const review = await Review.create({
      user,
      product,
      rating,
      comment,
    });

    // Update product rating
    const reviews = await Review.find({ product });

    const totalRating = reviews.reduce((sum, item) => sum + item.rating, 0);

    const averageRating = totalRating / reviews.length;

    await Product.findByIdAndUpdate(product, {
      rating: {
        average: Number(averageRating.toFixed(1)),
        count: reviews.length,
      },
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Product Reviews
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("user", "firstName lastName profile")
      .sort({
        createdAt: -1,
      });

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

// Delete Review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // user own review delete OR admin delete
    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Review deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Featured Reviews for Home Page
exports.getFeaturedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      approved: true,
      rating: { $gte: 4 },
    })
      .populate("user", "firstName lastName profile")
      .sort({
        createdAt: -1,
      })
      .limit(10);

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