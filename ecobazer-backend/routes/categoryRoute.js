const express = require("express");
const Product = require("../model/productModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Product.distinct("category");

    res.json({
      success: true,
      categories,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;