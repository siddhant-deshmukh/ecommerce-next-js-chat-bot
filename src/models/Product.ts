import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tagline: String,
  available_size: [Number],
  price: { type: Number, required: true },

  main_image: { type: String, required: true },
  other_images: [String],

  avg_rating: { type: Number, default: 0 },
  total_number_reviews: { type: Number, default: 0 },

  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],

  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },

  is_featured: { type: Boolean, default: false },
  is_best_seller: { type: Boolean, default: false },
  is_new_arrival: { type: Boolean, default: false },
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
