
require("dotenv").config();
console.log("INDEX STARTED");
const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const app = express();

const dbConection = require("./config/dbCoection");

const orderRoutes = require("./routes/orderRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

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

const {
  paymentControler,
  paymentSuccess,
} = require("./controlers/paymentControler");

const secureMiddleware  = require("./middleware/secureMiddleware");

// Rate Limit

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 100,

  standardHeaders: true,

  legacyHeaders: false,
});

// Middleware

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://ecobazer-fullstack.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(limiter);

// ================= AUTH =================

app.post("/register", registationControler);

app.post("/login", loginControler);

app.post("/forgot-password", forgotPasswordControler);

app.post("/reset-password/:token", resetpasswordControler);

app.post("/resend-verification", resendVerifycationEmailControler);

app.post("/verify-email/:token", verifyemailControler);

// ================= PRODUCT =================

app.post("/products", secureMiddleware, createProductController);

app.get("/products", allPrduct);

app.get("/products/:id", singleProduct);

app.put("/products/:id", secureMiddleware, updateProduct);

app.delete("/products/:id", secureMiddleware, deleteProduct);

// ================= CART =================

app.post("/cart", createCart);

app.post("/cart/update/:id", increDecre);

app.get("/cart/:userId", getCart);

app.delete("/cart/:id", proDelete);

// ================= PAYMENT =================

app.post("/payment", secureMiddleware, paymentControler);

app.post("/payment/success", secureMiddleware, paymentSuccess);

// ================= USER =================

app.get("/users", secureMiddleware, allUserControler);

app.get("/users/:id", secureMiddleware, singleUserControler);

app.put("/users/:id", secureMiddleware, updateUserControler);

app.delete("/users/:id", secureMiddleware, deleteUserControler);

// ================= ORDERS =================

// User orders

app.use("/api/orders", orderRoutes);

// Admin orders

app.use("/api/admin/orders", adminOrderRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,

    message: "EcoBazer API Running",
  });
});

// Error Handler

app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    success: false,

    message: err.message || "Server Error",
  });
});

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

