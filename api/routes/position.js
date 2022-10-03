const express = require("express");
const router = express.Router();
const positionController = require("../controllers/position");
const checkAdmin = require("../midlewares/check-admin");

router.get("/", positionController.position_getAll);

router.post("/", checkAdmin, positionController.position_create);

router.patch("/:positionId", checkAdmin, positionController.position_update);

router.delete("/:positionId", checkAdmin, positionController.position_delete);

module.exports = router;
