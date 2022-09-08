const Feedback = require("../model/feedback");

module.exports = {
  // handle get all Feedback
  feedback_getAll: async (req, res) => {
    try {
      const feedbacks = await Feedback.find();
      res
        .status(200)
        .json({ message: "Fetch feedback successfully.", feedbacks });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle get all by review
  feedback_getByReview: async (req, res) => {
    try {
      const feedbacks = await Feedback.find({
        feedbackId: req.params.feedbackId,
      }).populate([{ path: "userId" }]);
      res
        .status(200)
        .json({ message: "Fetch feedback successfully.", feedbacks });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle create Feedback
  feedback_create: async (req, res) => {
    try {
      const newFeedback = new Feedback(req.body);
      await newFeedback.save();
      res.status(201).json({ message: "Added a new feedback.", newFeedback });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle update feedback
  feedback_update: async (req, res) => {
    const { feedbackId } = req.params;
    try {
      const feedbackUpdated = await Feedback.updateOne(
        { _id: feedbackId },
        {
          $set: {
            ...req.body,
          },
        }
      );
      res.status(200).json({ message: "Feedback updated.", feedbackUpdated });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle delete feedback
  feedback_delete: async (req, res) => {
    const { feedbackId } = req.params;
    try {
      await Feedback.deleteOne({ _id: feedbackId });
      res.status(200).json({ message: "Feedback deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
