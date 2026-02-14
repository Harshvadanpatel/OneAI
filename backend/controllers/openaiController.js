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
            model: "openai/gpt-oss-20b",
            
            messages: [{ role: "user", content: prompt }],
        });

        const content = response?.choices?.[0]?.message?.content ?? "";

        // log for debugging when content is empty
        if (!content) console.warn('OpenAI controller: empty content, response=', JSON.stringify(response));

        return res.json({ success: true, content });
    } catch (error) {
        console.error("OpenAI error:", error?.response?.data || error.message);
        const message = error?.response?.data || error?.message || 'Unknown error';
        return res.json({ success: false, message });
    }
};

// Unauthenticated test endpoint for quick debugging
export const testGenerateOpenAI = async (req, res) => {
    try {
        const { prompt } = req.body || { prompt: 'Hello from test endpoint' };

        const response = await openai.chat.completions.create({
            model: 'openai/gpt-oss-20b:free',
            messages: [{ role: 'user', content: prompt }],
        });

        const content = response?.choices?.[0]?.message?.content ?? '';
        if (!content) console.warn('testOpenAI: empty content, response=', JSON.stringify(response));
        return res.json({ success: true, content, raw: response });
    } catch (error) {
        console.error('testOpenAI error:', error?.response?.data || error?.message);
        const message = error?.response?.data || error?.message || 'Unknown error';
        return res.json({ success: false, message, raw: error?.response?.data || null });
    }
};
