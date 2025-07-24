import mongoose from "mongoose";

export const ProductSpecificationSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  type: { type: String }, 
  key: { type: String },  
  value: { type: String },
}, { timestamps: true });

export default mongoose.models.ProductSpecification || mongoose.model('ProductSpecification', ProductSpecificationSchema);