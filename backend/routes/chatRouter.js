// routes/chatRouter.js
import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
  createChat,
  getChats,
  getChatById,
  deleteChat,
  appendMessage,
} from '../controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.post('/create', auth, createChat);
chatRouter.get('/list', auth, getChats);
chatRouter.get('/:chatId', auth, getChatById);
chatRouter.post('/append', auth, appendMessage);
chatRouter.post('/delete', auth, deleteChat);

export default chatRouter;
