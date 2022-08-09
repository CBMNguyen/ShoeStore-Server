const express = require("express");
const router = express.Router();

const pavementController = require("../controllers/pavement");

router.post("/", pavementController.pavement);

module.exports = router;
