const express = require("express");
const router = express.Router();
const importOrderController = require("../controllers/importOrder");
const checkImportRole = require("../midlewares/check-import-role");

router.get("/", importOrderController.importOrder_getAll);

router.post("/",checkImportRole, importOrderController.importOrder_create);

router.patch("/:importOrderId",checkImportRole, importOrderController.importOrder_update);

router.delete("/:importOrderId",checkImportRole, importOrderController.importOrder_delete);

module.exports = router;
