require("dotenv").config();

console.log("INDEX STARTED");

const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const app = express();

app.set("trust proxy", 1);

const dbConection = require("./config/dbCoection");

const orderRoutes = require("./routes/orderRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

const secureMiddleware = require("./middleware/secureMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");
const reviewRoute = require("./routes/reviewRoute");
const adminRoutes = require("./routes/adminRoutes");

const categoryRoute = require("./routes/categoryRoute");
const adminRoute = require("./routes/adminRoutes");

const wishlistRoutes = require("./routes/wishlistRoutes");

const notificationRoutes = require("./routes/notificationRoutes");

const contactRoute = require("./routes/contactRoute");

const adminReviewRoute = require("./routes/adminReviewRoute");

const adminNotificationRoutes = require("./routes/adminNotificationRoutes");

const paymentRoutes = require("./routes/paymentRoutes");

// Controllers

const {
  registationControler,
  loginControler,
  forgotPasswordControler,
  resetpasswordControler,
  resendVerifycationEmailControler,
  verifyemailControler,
} = require("./controlers/authenticationControler");

const {
  allUserControler,
  singleUserControler,
  deleteUserControler,
  updateUserControler,
} = require("./controlers/userControler");

const {
  createProductController,
  allPrduct,
  singleProduct,
  deleteProduct,
  updateProduct,
} = require("./controlers/productControler");

const {
  createCart,
  proDelete,
  increDecre,
  getCart,
} = require("./controlers/cartControler");



// Rate Limit

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 1000,

  standardHeaders: true,

  legacyHeaders: false,
});

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://ecobazer-fullstack.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(limiter);

app.use("/categories", categoryRoute);

// ================= AUTH =================

app.post("/register", registationControler);

app.post("/login", loginControler);

app.post("/forgot-password", forgotPasswordControler);

app.post("/reset-password/:token", resetpasswordControler);

app.post("/resend-verification", resendVerifycationEmailControler);

app.post("/verify-email/:token", verifyemailControler);

// ================= PRODUCT =================

// Admin only

app.post(
  "/products",
  secureMiddleware,
  adminMiddleware,
  createProductController,
);

app.get("/products", allPrduct);

app.get("/products/:id", singleProduct);

app.put("/products/:id", secureMiddleware, adminMiddleware, updateProduct);

app.delete("/products/:id", secureMiddleware, adminMiddleware, deleteProduct);

// ================= CART =================

app.post("/cart", createCart);

app.post("/cart/update/:id", increDecre);

app.get("/cart/:userId", getCart);

app.delete("/cart/:id", proDelete);

// ================= PAYMENT =================

app.use("/api/payment", paymentRoutes);

// ================= USER =================

// Admin only

app.get("/users", secureMiddleware, adminMiddleware, allUserControler);

app.get("/users/:id", secureMiddleware, singleUserControler);

app.put("/users/:id", secureMiddleware, updateUserControler);



app.delete(
  "/users/:id",
  secureMiddleware,
  adminMiddleware,
  deleteUserControler,
);

app.use(
  "/api/admin/notifications",
  adminNotificationRoutes
);



// ================= ORDERS =================

app.use("/api/orders", orderRoutes);

app.use("/api/admin/orders", adminOrderRoutes);

app.use("/admin", adminRoute);

app.use("/api/admin/reviews", adminReviewRoute);

// ================= NOTIFICATION =================

app.use("/api/notifications", notificationRoutes);

// ================= WISHLIST =================

app.use("/api/wishlist", wishlistRoutes);

// ==================review====================

app.use("/api/reviews", reviewRoute);

// ==================contact==========================
app.use("/api/contact", contactRoute);

// ================= TEST =================

app.get("/", (req, res) => {
  res.json({
    success: true,

    message: "EcoBazer API Running",
  });
});

// ================= ERROR =================

app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    success: false,

    message: err.message || "Server Error",
  });
});

// ================= SERVER =================

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await dbConection();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
};

startServer();
