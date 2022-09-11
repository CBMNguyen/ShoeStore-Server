const express = require("express");
const router = express.Router();
const checkAuth = require("../midlewares/check-auth.js");

const favouriteController = require("../controllers/favourite");

router.get("/:userId", favouriteController.favourite_getByUser);

router.post("/", favouriteController.favourite_create);

router.delete("/:favouriteId", favouriteController.favourite_delete);

module.exports = router;
