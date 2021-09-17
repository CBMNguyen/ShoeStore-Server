const express = require("express");
const router = express.Router();
const upload = require("../utils/common");
const checkAuth = require("../midlewares/check-auth.js");
const checkUser = require("../midlewares/check-user.js");

const productController = require("../controllers/products");

router.get("/", productController.product_getAll);

router.get("/:productId", productController.product_getById);

router.post("/",checkAuth, upload.array("images", 12), productController.product_create);

router.patch("/:productId", checkUser, upload.array("images", 12), productController.product_update);

router.delete("/:productId", checkAuth, productController.product_delete);

module.exports = router;
