const express = require("express");
const checkAuth = require("../midlewares/check-auth.js");
const router = express.Router();

const categoryController = require("../controllers/category");

router.get("/", categoryController.category_getAll);

router.post("/", checkAuth, categoryController.category_create);

router.patch("/:categoryId", checkAuth, categoryController.category_update);

router.delete("/:categoryId", checkAuth, categoryController.category_delete);

module.exports = router;
