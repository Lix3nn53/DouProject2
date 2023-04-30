const express = require("express");
const router = express.Router();
const controller = require("../app/providers/controllerProvider");
const passport = require("passport");

//auth routes
router.post("/register", (req, res) => {
  return controller.registerController.register(req, res);
});
router.post("/login", (req, res) => {
  return controller.loginController.login(req, res);
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return controller.loginController.currentUser(req, res);
  }
);

//openai routes

router.post(
  "/openai/grammerCorrection",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return controller.openaiController.grammerCorrection(req, res);
  }
);

module.exports = router;
