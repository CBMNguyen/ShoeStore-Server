const express = require("express");
const router = express.Router();

const colorController = require("../controllers/color");

router.get("/", colorController.color_getAll);

router.post("/", colorController.color_create);

router.patch("/:colorId", colorController.color_update);

router.delete("/:colorId", colorController.color_delete);

module.exports = router;
