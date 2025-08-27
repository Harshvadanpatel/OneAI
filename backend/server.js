// // index.js
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { clerkMiddleware, requireAuth } from '@clerk/express';
// import aiRouter from './routes/aiRouter.js';
// import chatRouter from './routes/chatRouter.js';
// import connectDB from './configs/db.js';
// import 'dotenv/config';

// dotenv.config();

// const app = express();
// await connectDB(); // <— call it!

// app.use(cors({
//     origin: [process.env.FRONTEND_URL,
//             "https://one-ai-one.vercel.app"],
//     credentials: true
// }));
// app.use(express.json());
// app.use(clerkMiddleware());

// // health
// app.get('/', (req, res) => res.send('✅ Backend is running...'));

// // protect everything below
// app.use(requireAuth());

// // routes
// app.use('/api/ai', aiRouter);
// app.use('/api/chat', chatRouter);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server http://localhost:${PORT}`));















// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from './routes/aiRouter.js';
import chatRouter from './routes/chatRouter.js';
import connectDB from './configs/db.js';

dotenv.config();

const app = express();

async function startServer() {
  try {
    await connectDB(); // ✅ connect MongoDB safely

    app.use(cors({
      origin: [process.env.FRONTEND_URL, "https://one-ai-one.vercel.app"],
      credentials: true
    }));
    app.use(express.json());
    app.use(clerkMiddleware());

    // Public route (health check)
    app.get('/', (req, res) => res.send('✅ Backend is running...'));

    // Protect everything below
    app.use(requireAuth());

    // Routes
    app.use('/api/ai', aiRouter);
    app.use('/api/chat', chatRouter);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();

