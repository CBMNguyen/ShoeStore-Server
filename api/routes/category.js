const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category");

router.get("/", categoryController.category_getAll);

router.post("/", categoryController.category_create);

router.delete("/:categoryId", categoryController.category_delete);

module.exports = router;
