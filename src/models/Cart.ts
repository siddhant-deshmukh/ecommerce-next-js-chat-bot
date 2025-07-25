import mongoose from "mongoose";

export const ProductSubSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  discount_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount' },
  final_amount: { type: Number, required: true },
  original_amt: { type: Number, required: true },
  discount: { type: Number, required: true, default: 0 },
  quantity: { type: Number, required: true },
  size: { type: Number },
  created_at: { type: Date },
}, { timestamps: false });

export const CartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [ProductSubSchema]
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);