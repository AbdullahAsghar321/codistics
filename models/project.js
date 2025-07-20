import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Optional: adds createdAt and updatedAt
});

// Prevent model overwrite on dev server restarts
export default mongoose.models.Project || mongoose.model("Project", projectSchema);
