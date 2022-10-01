const express = require("express");
const router = express.Router();

const discountTypeController = require("../controllers/discountType");

router.get("/", discountTypeController.discountType_getAll);

router.post("/", discountTypeController.discountType_create);

router.patch("/:discountTypeId", discountTypeController.discountType_update);

router.delete("/:discountTypeId", discountTypeController.discountType_delete);

module.exports = router;
