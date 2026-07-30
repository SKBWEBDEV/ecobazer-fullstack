const User = require("../model/userModel");
const Product = require("../model/productModel");

// Add product to wishlist
exports.addToWishlist = async (req, res) => {

  try {

    console.log("ADD WISHLIST HIT");
    console.log(req.params.productId);

    res.json({
      success:true,
      message:"Add wishlist working"
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

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

// Get user wishlist
exports.getWishlist = async (req, res) => {
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
