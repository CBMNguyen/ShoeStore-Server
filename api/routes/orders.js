const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orders");

router.get("/", orderController.order_getAll);

router.get("/:userId", orderController.order_get);

router.post("/", orderController.order_create);

router.patch("/:orderId", orderController.order_update);

router.patch("/state/:orderId", orderController.order_updateState);

router.delete("/:orderId", orderController.order_delete);

module.exports = router;
