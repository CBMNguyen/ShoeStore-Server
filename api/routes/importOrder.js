const express = require("express");
const router = express.Router();
const importOrderController = require("../controllers/importOrder");

router.get("/", importOrderController.importOrder_getAll);

router.post("/", importOrderController.importOrder_create);

router.patch("/:importOrderId", importOrderController.importOrder_update);

router.delete("/:importOrderId", importOrderController.importOrder_delete);

module.exports = router;
