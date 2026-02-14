

import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generate = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        // Use a 2026-supported model ID
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite", 
        });

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return res.json({ success: true, content: text });

    } catch (error) {
        console.error("Gemini Error:", error);

        // Handle the specific 404 for retired models
        if (error.status === 404) {
            return res.status(404).json({
                success: false,
                message: "The requested model is retired. Please use 'gemini-2.5-flash-lite' instead.",
            });
        }

        return res.status(error.status || 500).json({
            success: false,
            message: error.message,
        });
    }
};