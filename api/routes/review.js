const express = require("express");
const router = express.Router();
const checkAuth = require("../midlewares/check-auth.js");

const reviewController = require("../controllers/review");

router.get("/", reviewController.review_getAll);

router.get("/:productId", reviewController.review_getByProduct);

router.post("/", reviewController.review_create);

router.patch("/:reviewId", reviewController.review_update);

router.delete("/:reviewId", reviewController.review_delete);

module.exports = router;
