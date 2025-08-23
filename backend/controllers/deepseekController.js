// controllers/deepseekController.js
import "dotenv/config";
import OpenAI from "openai";

const openrouter = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export const generateDeepSeek = async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openrouter.chat.completions.create({
            model: "deepseek/deepseek-chat", // DeepSeek chat model on OpenRouter
            messages: [{ role: "user", content: prompt }],
        });

        const content = response.choices?.[0]?.message?.content ?? "";
        return res.json({ success: true, content });
    } catch (err) {
        console.error("DeepSeek error:", err?.response?.data || err.message);
        return res.json({ success: false, message: err.message });
    }
};
