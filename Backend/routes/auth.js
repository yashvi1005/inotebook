const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { body } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// ROUTE : 1 create a user using POST "/api/auth/newuser"
router.post(
  "/newuser",
  [
    body("email", "Enter valid email").isEmail(),
    body("name", "length of name should be 3 minimum").isLength({ min: 3 }),
    body("password", "length of password should be 5 minimum").isLength({
      min: 5,
    }),
  ],
  authController.authe
);

// ROUTE : 2 login user using POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "password can not be blank").exists(),
  ],
  authController.postLogin
);

// ROUTE : 3 logedin user detail using POST "/api/auth/logedin" Login required
router.get("/logedinUser", fetchuser, authController.postLogedinUser);

module.exports = router;
