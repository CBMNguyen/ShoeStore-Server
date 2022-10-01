const express = require("express");
const router = express.Router();
const checkAuth = require("../midlewares/check-auth.js");

const addressController = require("../controllers/address");

router.get("/:userId", addressController.address_getByUser);

router.post("/", addressController.address_create);

router.delete("/:addressId", addressController.address_delete);

module.exports = router;
