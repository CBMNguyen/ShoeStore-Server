const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplier");

router.get("/", supplierController.supplier_getAll);

router.post("/", supplierController.supplier_create);

router.patch("/:supplierId", supplierController.supplier_update);

router.delete("/:supplierId", supplierController.supplier_delete);

module.exports = router;
