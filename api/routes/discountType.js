const express = require("express");
const router = express.Router();

const discountTypeController = require("../controllers/discountType");
const checkAdmin = require("../midlewares/check-admin");

router.get("/", discountTypeController.discountType_getAll);

router.post("/", checkAdmin, discountTypeController.discountType_create);

router.patch(
  "/:discountTypeId",
  checkAdmin,
  discountTypeController.discountType_update
);

router.delete(
  "/:discountTypeId",
  checkAdmin,
  discountTypeController.discountType_delete
);

module.exports = router;
