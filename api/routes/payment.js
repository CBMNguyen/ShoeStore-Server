const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment");
const checkAuth = require("../midlewares/check-auth");

router.post("/", checkAuth, paymentController.payment);

module.exports = router;
