const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplier");
const checkAdmin = require("../midlewares/check-admin");

router.get("/", supplierController.supplier_getAll);

router.post("/", checkAdmin, supplierController.supplier_create);

router.patch("/:supplierId", checkAdmin, supplierController.supplier_update);

router.delete("/:supplierId", checkAdmin, supplierController.supplier_delete);

module.exports = router;
