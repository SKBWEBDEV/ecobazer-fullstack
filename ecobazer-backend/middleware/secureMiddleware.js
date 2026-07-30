const jwt = require("jsonwebtoken");

const secureMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing",
      });
    }


    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;


    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );


    req.user = {
      id: decoded.id || decoded._id || decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };


    if (!req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User id missing",
      });
    }


    next();


  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });

  }
};


module.exports = secureMiddleware;