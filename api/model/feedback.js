const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
    feedbackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
      require: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
