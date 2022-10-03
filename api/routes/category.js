const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category");
const checkAdmin = require("../midlewares/check-admin.js");

router.get("/", categoryController.category_getAll);

router.post("/", checkAdmin, categoryController.category_create);

router.patch("/:categoryId", checkAdmin, categoryController.category_update);

router.delete("/:categoryId", checkAdmin, categoryController.category_delete);

module.exports = router;
