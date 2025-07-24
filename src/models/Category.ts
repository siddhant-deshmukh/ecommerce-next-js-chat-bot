import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true }
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);