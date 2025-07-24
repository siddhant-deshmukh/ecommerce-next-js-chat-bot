import mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  time: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  products: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      discount_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount' },
      price: Number,
      time: Date,
      quantity: Number,
      size: Number,
    }
  ]
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
