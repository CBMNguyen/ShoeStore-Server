const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discount");
const checkAuth = require("../midlewares/check-auth");

router.get("/", checkAuth, discountController.discount_getAll);

router.get("/:discountCode", checkAuth, discountController.discount_getByCode);

router.post("/", checkAuth, discountController.discount_create);

router.patch("/:discountId", checkAuth, discountController.discount_update);

router.delete("/:discountId", checkAuth, discountController.discount_delete);

router.post("/sendMail", checkAuth, discountController.discount_sendMail);

module.exports = router;
