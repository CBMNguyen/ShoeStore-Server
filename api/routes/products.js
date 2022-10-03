const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const checkAuth = require("../midlewares/check-auth.js");

const productController = require("../controllers/products");
const checkProductRole = require("../midlewares/check-product-role");

router.get("/", productController.product_getAll);

router.get("/:productId", productController.product_getById);

router.post("/", checkProductRole, upload.array("images", 12), productController.product_create);

router.patch(
  "/:productId",
  checkProductRole,
  upload.array("images", 12),
  productController.product_update
);

router.patch("/state/:productId", checkProductRole, productController.product_updateState);

router.patch("/quantity/:productId", checkProductRole, productController.product_updateQuantity);

router.delete("/:productId", checkProductRole, productController.product_delete);

module.exports = router;
