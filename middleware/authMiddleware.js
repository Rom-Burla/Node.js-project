//                                                                                           בס"ד

const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if token exists and is verified
  if (token) {
    jwt.verify(
      token,
      "Moria ve Rom Hatotahim asu project node.js and Rachael take pictures of cats down the streets",
      (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.status(401).json("Token is not Valid, please login again");
        } else {
          console.log(decodedToken);
          next();
        }
      }
    );
  } else {
    console.log("no token for this user");
    res.status(401).json("No token for this user, please login");
  }
};

module.exports = {
  requireAuth,
};
