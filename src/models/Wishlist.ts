import mongoose from "mongoose";

export const WishlistSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});

WishlistSchema.index({ user_id: 1, product_id: 1 }, { unique: true });

export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);
