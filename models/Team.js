import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'member', 'guest'],
    default: 'member',
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  skills: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: 'At least one skill is required.',
    },
  },
}, { timestamps: true });

// ✅ Use this pattern to avoid OverwriteModelError
const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;
