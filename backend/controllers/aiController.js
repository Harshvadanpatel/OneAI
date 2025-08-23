import "dotenv/config";

import OpenAI from "openai";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generate = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt } = req.body;

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{
                    role: "user",
                    content: prompt,
                },
            ],
            temperature :0.7,
            
        });

        const content = response.choices[0].message.content;

        res.json({success:true,content})


    } catch (error) {

        console.log(error.message)
        res.json({success:false,message:error.message})

    }
}