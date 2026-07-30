exports.addToWishlist = async (req, res) => {
  try {

    console.log("ADD WISHLIST HIT");

    const userId = req.user.id;
    const { productId } = req.params;

    console.log("USER ID:", userId);
    console.log("PRODUCT ID:", productId);


    const user = await User.findById(userId);

    console.log("USER:", user);


    if (!user) {
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }


    user.wishlist.push(productId);

    await user.save();


    console.log("WISHLIST SAVED:", user.wishlist);


    res.json({
      success:true,
      message:"Added to wishlist",
      wishlist:user.wishlist
    });


  } catch(error){

    console.log("WISHLIST ERROR:", error);

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};