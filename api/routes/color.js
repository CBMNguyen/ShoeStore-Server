const express = require("express");
const router = express.Router();

const colorController = require("../controllers/color");
const checkAdmin = require("../midlewares/check-admin.js");

router.get("/", colorController.color_getAll);

router.post("/", checkAdmin, colorController.color_create);

router.patch("/:colorId", checkAdmin, colorController.color_update);

router.delete("/:colorId", checkAdmin, colorController.color_delete);

module.exports = router;
