const jwt = require("jsonwebtoken");
const isAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(304).json({
      error: "you are not authorized",
    });

  // verity token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data) => {
    if (error) return res.status(304).json({ error: "Not authorized" });

    req.user = data;
    next();
  });
};

module.exports = {
  isAuth,
};
