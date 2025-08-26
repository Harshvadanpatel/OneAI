// controllers/chatController.js
import { getAuth, clerkClient } from '@clerk/express';
import Chat from '../models/Chat.js';

const nameFromUser = (user) =>
  user?.fullName ||
  user?.username ||
  user?.primaryEmailAddress?.emailAddress ||
  'User';


export const createChat = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);

    // Count how many chats user already has
    const count = await Chat.countDocuments({ userId });

    // Auto-generate chat name → Chat 1, Chat 2, Chat 3...
    const chatName = `Chat ${count + 1}`;

    const chat = await Chat.create({
      userId,
      userName: user.firstName || "Anonymous",
      name: chatName,
      messages: [],
    });

    return res.json({ success: true, chat });
  } catch (error) {
    console.error("❌ Error creating chat:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
};



export const getChats = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.json({ success: false, message: 'Unauthorized' });

    const chats = await Chat.find({ userId })
      .select('_id name updatedAt')
      .sort({ updatedAt: -1 });

    return res.json({ success: true, chats });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getChatById = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.json({ success: false, message: 'Unauthorized' });

    const { chatId } = req.params;
    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) return res.json({ success: false, message: 'Chat not found' });

    return res.json({ success: true, chat });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.json({ success: false, message: 'Unauthorized' });

    const { chatId } = req.body;
    await Chat.deleteOne({ _id: chatId, userId });
    return res.json({ success: true, message: 'Chat deleted' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

/**
 * Append a user message and (optionally) assistant responses to a chat.
 * Body: { chatId, userText, chatgpt?, gemini?, deepseek? }
 */
export const appendMessage = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.json({ success: false, message: 'Unauthorized' });

    const { chatId, userText, chatgpt, gemini, deepseek } = req.body;
    if (!chatId || !userText)
      return res.json({ success: false, message: 'chatId and userText required' });

    const now = Date.now();

    // push user message
    await Chat.updateOne(
      { _id: chatId, userId },
      { $push: { messages: { role: 'user', user_text: userText, timestamp: now } } }
    );

    // if any assistant content present, push one combined assistant record
    if (chatgpt || gemini || deepseek) {
      await Chat.updateOne(
        { _id: chatId, userId },
        {
          $push: {
            messages: {
              role: 'assistant',
              chatgpt_content: chatgpt || undefined,
              gemini_content: gemini || undefined,
              deepseek_content: deepseek || undefined,
              timestamp: Date.now(),
            },
          },
        }
      );
    }

    const chat = await Chat.findOne({ _id: chatId, userId });
    return res.json({ success: true, chat });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
