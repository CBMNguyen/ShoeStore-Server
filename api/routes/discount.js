const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discount");
const checkAdmin = require("../midlewares/check-admin");
const checkAuth = require("../midlewares/check-auth");

router.get("/", checkAdmin, discountController.discount_getAll);

router.get("/:discountCode", checkAuth, discountController.discount_getByCode);

router.post("/", checkAdmin, discountController.discount_create);

router.patch("/:discountId", checkAdmin, discountController.discount_update);

router.delete("/:discountId", checkAdmin, discountController.discount_delete);

router.post("/sendMail", checkAdmin, discountController.discount_sendMail);

module.exports = router;
