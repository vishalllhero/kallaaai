import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 API KEY from Render env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔥 Chat API
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });

  } catch (err) {
    console.error(err);
    res.json({
      reply: "Error aa gaya bhai 😢",
    });
  }
});

// ✅ PORT fix (IMPORTANT for Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 KALLAA AI running on port ${PORT}`);
});