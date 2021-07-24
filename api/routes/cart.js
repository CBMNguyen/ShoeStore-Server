const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart");
router.get("/", cartController.cart_getAll);
router.patch("/:cartId", cartController.cart_update);
router.delete("/:cartId", cartController.cart_delete);

module.exports = router;
