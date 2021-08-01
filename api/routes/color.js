const express = require("express");
const checkAuth = require("../midlewares/check-auth.js");
const router = express.Router();

const colorController = require("../controllers/color");

router.get("/", colorController.color_getAll);

router.post("/",checkAuth, colorController.color_create);

router.patch("/:colorId", checkAuth, colorController.color_update);

router.delete("/:colorId",checkAuth, colorController.color_delete);

module.exports = router;
