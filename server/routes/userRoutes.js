const express = require("express");
const { userController } = require("../controllers/userController");
const { body } = require("express-validator");
const { validate } = require("../middleware/validation");

const userRoutes = express.Router();

userRoutes.get("/", userController.getAll);

userRoutes.get("/:id", userController.getById);

userRoutes.post(
  "/",
  body("username").notEmpty().withMessage("Username field cannot be empty!"),
  body("password").notEmpty().withMessage("Password field cannot be empty!"),
  validate,
  userController.add
);

module.exports = {
  userRoutes,
};
