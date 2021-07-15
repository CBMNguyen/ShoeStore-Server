const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/signup", userController.user_signup);

router.post("/login", userController.user_login);

router.get("/", userController.user_getAll);

router.get("/:userId", userController.user_get);

router.patch("/:userId", userController.user_update);

router.delete("/:userId", userController.user_delete);

module.exports = router;
