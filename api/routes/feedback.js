const express = require("express");
const router = express.Router();
const checkAuth = require("../midlewares/check-auth.js");

const feedbackController = require("../controllers/feedback");

router.get("/", feedbackController.feedback_getAll);

router.get("/:reviewId", feedbackController.feedback_getByReview);

router.post("/", checkAuth, feedbackController.feedback_create);

router.patch("/:feedbackId", checkAuth, feedbackController.feedback_update);

router.delete("/:feedbackId", checkAuth, feedbackController.feedback_delete);

module.exports = router;
