const express = require("express");
const router = express.Router();
const checkAuth = require("../midlewares/check-auth.js");
const roleController = require("../controllers/role");
const checkAdmin = require("../midlewares/check-admin.js");

router.get("/", roleController.role_getAll);

router.post("/", checkAdmin, roleController.role_create);

router.patch("/:roleId", checkAdmin, roleController.role_update);

router.delete("/:roleId", checkAdmin, roleController.role_delete);

module.exports = router;
