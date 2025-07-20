import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    href: { type: String, required: true },
    recommended: { type: Boolean, default: false },
    features: [FeatureSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
