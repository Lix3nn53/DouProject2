const express = require("express");
const router = express.Router();
const controller = require("../app/providers/controllerProvider");
const passport = require("passport");

//auth routes
router.post("/auth/register", (req, res) => {
  return controller.registerController.register(req, res);
});
router.post("/auth/login", (req, res) => {
  return controller.loginController.login(req, res);
});

router.get(
  "/auth/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return controller.loginController.currentUser(req, res);
  }
);

// document routes
router.post(
  "/documents/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return controller.documentsController.createDocument(req, res);
  }
);

router.get(
  "/documents/list",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return controller.documentsController.getDocuments(req, res);
  }
);

router.post(
  "/documents/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return controller.documentsController.deleteDocument(req, res);
  }
);

router.post(
  "/documents/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return controller.documentsController.updateDocument(req, res);
  }
);

router.get(
  "/documents/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return controller.documentsController.getDocument(req, res);
  }
);

//openai routes

router.post(
  "/app/grammerCorrection",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return controller.openaiController.grammerCorrection(req, res);
  }
);

router.post("/app/improveWriting", (req, res) => {
  return controller.openaiController.improveWriting(req, res);
});

router.post("/app/makeShorter", (req, res) => {
  return controller.openaiController.makeShorter(req, res);
});

router.post("/app/makeLonger", (req, res) => {
  return controller.openaiController.makeLonger(req, res);
});

router.post("/app/changeTone", (req, res) => {
  return controller.openaiController.changeTone(req, res);
});

router.post("/app/simplifyLanguage", (req, res) => {
  return controller.openaiController.simplifyLanguage(req, res);
});

router.post("/app/continueWriting", (req, res) => {
  return controller.openaiController.continueWriting(req, res);
});

router.post("/app/translate", (req, res) => {
  return controller.openaiController.translate(req, res);
});

router.post("/app/summarize", (req, res) => {
  return controller.openaiController.summarize(req, res);
});

router.post("/app/explain", (req, res) => {
  return controller.openaiController.explain(req, res);
});

module.exports = router;
