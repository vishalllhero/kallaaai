import express from "express";
import cors from "cors";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 API KEY from Render env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 📁 Fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🏠 HOMEPAGE ROUTE (IMPORTANT FIX)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🔥 CHAT API
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
      reply: "Error aa gaya bhai 😳",
    });
  }
});

// 🚀 PORT FIX (Render ke liye)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 KALLAA AI running on port ${PORT}`);
});