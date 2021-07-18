const express = require("express");
const router = express.Router();
const upload = require("../utils/common");

const productController = require("../controllers/products");

router.get("/", productController.product_getAll);

router.get("/:productId", productController.product_getById);

router.post("/", upload.array("images", 12), productController.product_create);

router.patch("/:productId", productController.product_update);

router.delete("/:productId", productController.product_delete);

module.exports = router;
