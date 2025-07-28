import mongoose, { ObjectId, Types } from "mongoose";

export interface ICreateOrderProdcutSchema {
  product_id: Types.ObjectId,
  discount_id: Types.ObjectId,
  user_id: Types.ObjectId,
  final_amount: number,
  original_amt: number,
  discount: number,
  quantity: number,
  size: number,
}

export interface IOrderProdcutSchema extends ICreateOrderProdcutSchema {
  order_id: ObjectId,
}

export interface IOrderDocument extends IOrderProdcutSchema, Document {
}

export const OrderProductSchema = new mongoose.Schema<IOrderProdcutSchema>({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    index: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  discount_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discount'
  },
  final_amount: { type: Number, required: true },
  original_amt: { type: Number, required: true },
  discount: { type: Number, required: true, default: 0 },
  quantity: { type: Number, required: true },
  size: { type: Number }, 
}, { timestamps: true }); 

// OrderProductSchema.index({ order_id: 1, product_id: 1 }, { unique: true });

export default mongoose.models.OrderProduct as mongoose.Model<IOrderDocument> || mongoose.model('OrderProduct', OrderProductSchema);