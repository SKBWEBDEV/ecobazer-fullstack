const User = require("../model/userModel");
const Product = require("../model/productModel");

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    console.log("ADD WISHLIST HIT");

    const userId = req.user.id;
    const { productId } = req.params;

    console.log("USER ID:", userId);
    console.log("PRODUCT ID:", productId);

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Already added
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({
        success: false,
        message: "Already added to wishlist",
      });
    }

    // Add product
    user.wishlist.push(productId);

    await user.save();

    console.log("WISHLIST SAVED:", user.wishlist);

    res.status(200).json({
      success: true,
      message: "Added to wishlist ❤️",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.log("WISHLIST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const user = await User.findById(userId);

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("wishlist");

    res.status(200).json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
