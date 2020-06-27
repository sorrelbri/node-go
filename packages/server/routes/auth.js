const express = require("express");
const router = express.Router();
const app = require("../server");
const authController = require("../controllers/auth");
const {
  signupValidationRules,
  loginValidationRules,
  validate,
} = require("../middleware/userValidator");

router.post(
  "/signup",
  signupValidationRules(),
  validate,
  authController.signup
);
router.post("/login", loginValidationRules(), validate, authController.login);
router.post("/guest", authController.guest);

module.exports = router;
