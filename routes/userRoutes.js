//                                                                                           בס"ד

const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

// localhost:3000/user/signup
router.post("/signup", userController.signup_post);

//  localhost:3000/user/login
router.post("/login", userController.login_post);

// localhost:3000/user/token
router.get("/token", userController.by_token);

module.exports = router;
