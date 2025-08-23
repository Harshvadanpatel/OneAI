import express from 'express';
import { generate } from '../controllers/aiController.js';               // your Gemini
import { generateOpenAI } from '../controllers/openaiController.js';     // your ChatGPT via OpenRouter (if you added earlier)
import { generateDeepSeek } from '../controllers/deepseekController.js'; // <-- NEW
import { auth } from '../middlewares/auth.js';

const aiRouter = express.Router();

aiRouter.post('/gemini',   auth, generate);
aiRouter.post('/openai',   auth, generateOpenAI); // already in your code if you followed earlier steps
aiRouter.post('/deepseek', auth, generateDeepSeek); // <-- NEW

export default aiRouter;
