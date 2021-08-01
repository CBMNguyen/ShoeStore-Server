const express = require("express");
const router = express.Router();
const checkAuth = require("../midlewares/check-auth.js");

const sizeController = require("../controllers/size");

router.get("/", sizeController.size_getAll);

router.post("/", checkAuth, sizeController.size_create);

router.patch("/:sizeId", checkAuth, sizeController.size_update);

router.delete("/:sizeId", checkAuth, sizeController.size_delete);

module.exports = router;
