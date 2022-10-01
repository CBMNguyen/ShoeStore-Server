const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const checkAuth = require("../midlewares/check-auth.js");
const checkUser = require("../midlewares/check-user.js");

const productController = require("../controllers/products");

router.get("/", productController.product_getAll);

router.get("/:productId", productController.product_getById);

router.post("/", upload.array("images", 12), productController.product_create);

router.patch(
  "/:productId",
  checkUser,
  upload.array("images", 12),
  productController.product_update
);

router.patch("/state/:productId", productController.product_updateState);

router.patch("/quantity/:productId", productController.product_updateQuantity);

router.delete("/:productId", checkAuth, productController.product_delete);

module.exports = router;
