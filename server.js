import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🔥 FREE FAST AI (OpenRouter)
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    console.log("API RESPONSE:", data);

    let reply = "No reply";

    if (data.choices && data.choices.length > 0) {
      reply = data.choices[0].message?.content;
    } else if (data.error) {
      reply = data.error.message;
    }

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({
      reply: "Error aa gaya bhai 😢"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 FREE FAST AI running on port ${PORT}`);
});