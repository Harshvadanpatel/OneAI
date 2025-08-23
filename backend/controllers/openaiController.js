// controllers/openaiController.js
import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export const generateOpenAI = async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.chat.completions.create({
            model: "openai/gpt-oss-20b:free",
            messages: [{ role: "user", content: prompt }],
        });

        const content = response.choices[0].message.content;

        res.json({ success: true, content });
    } catch (error) {
        console.error("OpenAI error:", error.message);
        res.json({ success: false, message: error.message });
    }
};
