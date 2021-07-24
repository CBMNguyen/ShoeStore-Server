const express = require("express");
const router = express.Router();

const sizeController = require("../controllers/size");

router.get("/", sizeController.size_getAll);

router.post("/", sizeController.size_create);

router.post("/:sizeId", sizeController.size_update);

router.delete("/:sizeId", sizeController.size_delete);

module.exports = router;
