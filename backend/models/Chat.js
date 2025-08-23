// models/Chat.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    user_text: { type: String },           // present when role === 'user'
    chatgpt_content: { type: String },     // assistant outputs (optional)
    gemini_content: { type: String },
    deepseek_content: { type: String },
    timestamp: { type: Number, required: true },
  },
  { _id: false }
);

const ChatSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    name: { type: String, required: true },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;
