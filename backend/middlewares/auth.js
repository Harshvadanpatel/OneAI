// middlewares/auth.js
import { clerkClient } from '@clerk/express';

export const auth = async (req, res, next) => {
  try {
    const { userId } = await req.auth();
    if (!userId) return res.json({ success: false, message: 'Unauthorized' });
    // Optional: ensure user exists
    await clerkClient.users.getUser(userId);
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
