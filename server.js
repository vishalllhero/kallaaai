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

// 🌐 FRONTEND
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🤖 AI CHAT
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
        model: "openrouter/auto",
        messages: [
          {
            role: "system",
            content: "You are a smart AI assistant like Jarvis. Reply in Hindi + English mix."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    console.log("AI:", data);

    let reply = "No reply";

    if (data.choices && data.choices.length > 0) {
      reply = data.choices[0].message?.content;
    } else if (data.error) {
      reply = data.error.message;
    }

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Error aa gaya 😢" });
  }
});

// 💰 ORDER SAVE
app.post("/order", (req, res) => {
  const { wallet, txHash } = req.body;

  console.log("🛒 NEW ORDER:");
  console.log("Wallet:", wallet);
  console.log("TX:", txHash);

  res.json({ success: true });
});

// 🚀 SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 KALLAA AI running on ${PORT}`);
});