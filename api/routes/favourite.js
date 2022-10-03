const express = require("express");
const router = express.Router();
const checkAuth = require("../midlewares/check-auth.js");

const favouriteController = require("../controllers/favourite");

router.get("/:userId", checkAuth, favouriteController.favourite_getByUser);

router.post("/", checkAuth, favouriteController.favourite_create);

router.delete("/:favouriteId", checkAuth, favouriteController.favourite_delete);

module.exports = router;
