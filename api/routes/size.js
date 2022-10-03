const express = require("express");
const router = express.Router();
const checkAuth = require("../midlewares/check-auth.js");

const sizeController = require("../controllers/size");
const checkAdmin = require("../midlewares/check-admin.js");

router.get("/", sizeController.size_getAll);

router.post("/", checkAdmin, sizeController.size_create);

router.patch("/:sizeId", checkAdmin, sizeController.size_update);

router.delete("/:sizeId", checkAdmin, sizeController.size_delete);

module.exports = router;
