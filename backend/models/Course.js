import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  content: {
    type: Array,
    requird: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Course", courseSchema);
