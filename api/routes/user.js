const express = require("express");
const router = express.Router();
const upload = require("../utils/common");
const checkAuth = require("../midlewares/check-auth.js");
const checkUser = require("../midlewares/check-user.js");

const userController = require("../controllers/user");

router.post("/signup", userController.user_signup);

router.post("/login", userController.user_login);

router.get("/", checkAuth, userController.user_getAll);

router.get("/:userId", userController.user_get);

router.patch(
  "/:userId",
  checkUser,
  upload.single("image"),
  userController.user_update
);

router.delete("/:userId", checkAuth, userController.user_delete);

module.exports = router;
