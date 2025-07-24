import mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String }
  },
  { _id: false }
);

export const CustomChatSchema = new mongoose.Schema({
  productId: { type: String, required: false },
  messages: [MessageSchema],
  ipAddress: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.CustomChat || mongoose.model('CustomChat', CustomChatSchema);
