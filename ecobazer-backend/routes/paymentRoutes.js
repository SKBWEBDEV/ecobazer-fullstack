const express = require("express");
const router = express.Router();

const auth = require("../middleware/secureMiddleware");

const {
  paymentControler,
  paymentSuccess,
} = require("../controlers/paymentControler");


router.post("/", auth, paymentControler);

router.post("/success", paymentSuccess);


module.exports = router;