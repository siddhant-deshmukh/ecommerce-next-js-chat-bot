import mongoose from 'mongoose';

export const RateLimitLogSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  timestamps: { type: [Date], default: [] }
});

export default mongoose.models.RateLimitLog || mongoose.model('RateLimitLog', RateLimitLogSchema);