const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orders");
const checkEmployee = require("../midlewares/check-employee.js");
const checkUser = require("../midlewares/check-user.js");

router.get("/", checkEmployee,orderController.order_getAll);

router.get("/:userId", checkUser, orderController.order_get);

router.post("/", checkUser,orderController.order_create);

router.patch("/:orderId", checkUser, orderController.order_update);

router.delete("/:orderId", checkUser, orderController.order_delete);

module.exports = router;
