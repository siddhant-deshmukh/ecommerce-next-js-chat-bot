import mongoose from "mongoose";

export const CartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      size: Number,
    }
  ]
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
