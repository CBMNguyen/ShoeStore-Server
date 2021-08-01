const express = require("express");
const router = express.Router();
const checkAuth = require("../midlewares/check-auth.js");
const positionController = require("../controllers/position");

router.get("/", positionController.position_getAll);

router.post("/",checkAuth, positionController.position_create);

router.patch("/:positionId", checkAuth, positionController.position_update);

router.delete("/:positionId", checkAuth, positionController.position_delete);

module.exports = router;
