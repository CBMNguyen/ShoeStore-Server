const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const checkAuth = require("../midlewares/check-auth.js");

const userController = require("../controllers/user");
router.post("/signup", userController.user_signup);

router.post("/login", userController.user_login);

router.post("/resetPassword", userController.user_resetPassword);

router.get("/", userController.user_getAll);

router.get("/:userId", userController.user_get);

router.patch("/:userId", upload.single("image"), userController.user_update);

router.delete("/:userId", checkAuth, userController.user_delete);

module.exports = router;
