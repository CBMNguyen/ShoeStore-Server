const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orders");
const checkAuth = require("../midlewares/check-auth");
const checkOrderRole = require("../midlewares/check-order-role");

router.get("/", orderController.order_getAll);

router.get("/:userId", checkAuth, orderController.order_get);

router.post("/", checkAuth, orderController.order_create);

router.patch("/:orderId", checkAuth, orderController.order_update);

router.patch("/state/:orderId", checkAuth, orderController.order_updateState);

router.delete("/:orderId", checkOrderRole, orderController.order_delete);

module.exports = router;
