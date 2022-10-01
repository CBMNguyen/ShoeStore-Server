const Review = require("../model/review");
const Feedback = require("../model/feedback");

module.exports = {
  // handle get all Review
  review_getAll: async (req, res) => {
    try {
      const reviews = await Review.find().populate([
        { path: "userId" },
        { path: "productId" },
      ]);
      res.status(200).json({ message: "Fetch review successfully.", reviews });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle get all by product
  review_getByProduct: async (req, res) => {
    try {
      const reviews = await Review.find({
        productId: req.params.productId,
      }).populate([{ path: "userId" }]);
      res.status(200).json({ message: "Fetch review successfully.", reviews });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle create Review
  review_create: async (req, res) => {
    try {
      const newReview = new Review(req.body);
      await newReview.save();
      await newReview.populate([{ path: "userId" }]).execPopulate();
      res.status(201).json({ message: "Added a new review.", newReview });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle update review
  review_update: async (req, res) => {
    const { reviewId } = req.params;
    try {
      const reviewUpdated = await Review.updateOne(
        { _id: reviewId },
        {
          $set: {
            ...req.body,
          },
        }
      );
      res.status(200).json({ message: "Review updated.", reviewUpdated });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle delete review
  review_delete: async (req, res) => {
    const { reviewId } = req.params;
    try {
      await Review.deleteOne({ _id: reviewId });
      await Feedback.deleteMany({ reviewId });
      res.status(200).json({ message: "Reviews and feedbacks deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
