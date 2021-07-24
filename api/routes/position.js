const express = require("express");
const router = express.Router();

const positionController = require("../controllers/position");

router.get("/", positionController.position_getAll);

router.post("/", positionController.position_create);

router.post("/:positionId", positionController.position_update);

router.delete("/:positionId", positionController.position_delete);

module.exports = router;
