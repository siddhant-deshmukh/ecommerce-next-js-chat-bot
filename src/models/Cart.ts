import mongoose, { ObjectId } from "mongoose";
import { Types } from "mongoose";


export interface IProductSubSchema {
  product_id: Types.ObjectId,
  discount_id: Types.ObjectId,
  final_amount: number,
  original_amt: number,
  discount: number,
  quantity: number,
  size: number,
  created_at: Date,
}

export interface ICartSchema {
  user_id: ObjectId,
  products: IProductSubSchema[],
}

export interface ICartDocument extends ICartSchema, Document {
  createdAt: Date;
  updatedAt: Date;
}

export const ProductSubSchema = new mongoose.Schema<IProductSubSchema>({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  discount_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount' },
  final_amount: { type: Number, required: true },
  original_amt: { type: Number, required: true },
  discount: { type: Number, required: true, default: 0 },
  quantity: { type: Number, required: true },
  size: { type: Number },
  created_at: { type: Date },
}, { timestamps: false });

export const CartSchema = new mongoose.Schema<ICartSchema>({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [ProductSubSchema]
}, { timestamps: true });

export default mongoose.models.Cart as mongoose.Model<ICartDocument> || mongoose.model('Cart', CartSchema);