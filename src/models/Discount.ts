import mongoose from "mongoose";

export const DiscountSchema = new mongoose.Schema({
  description: String,
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  percentage: Number,
  is_active: { type: Boolean, default: true },
  type: { type: String, enum: ['flat', 'percentage'], default: 'percentage' },
}, { timestamps: true });

DiscountSchema.index(
  { product_id: 1, is_active: 1 },
)

//* Only one active discount at a time
DiscountSchema.pre('save', async function (next) {
  if (this.isModified('is_active') && this.is_active) {
    await mongoose.model('Discount').updateMany(
      {
        product_id: this.product_id,
        is_active: true,
        _id: { $ne: this._id }
      },
      { $set: { is_active: false } }
    );
  }
  next();
});

export default mongoose.models.Discount || mongoose.model('Discount', DiscountSchema);
