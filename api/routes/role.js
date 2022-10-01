const express = require("express");
const router = express.Router();
const checkAuth = require("../midlewares/check-auth.js");
const roleController = require("../controllers/role");

router.get("/", roleController.role_getAll);

router.post("/", roleController.role_create);

router.patch("/:roleId", roleController.role_update);

router.delete("/:roleId", roleController.role_delete);

module.exports = router;
