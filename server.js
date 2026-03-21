import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("🔥 MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

/* ================= SCHEMA ================= */
const OrderSchema = new mongoose.Schema({
  wallet: String,
  product: String,
  tx: String,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);

/* ================= STATIC FILES ================= */
app.use(express.static(path.join(__dirname, "public")));

/* ================= ROUTES ================= */

// ADMIN PANEL
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

/* ================= LOGIN ================= */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "12345") {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

/* ================= AI CHAT ================= */
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
          { role: "system", content: "You are KALLAA AI helping design clothes." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices?.[0]?.message?.content || "No reply"
    });

  } catch (err) {
    console.log("❌ CHAT ERROR:", err);
    res.json({ reply: "Error 😢" });
  }
});
/* ================= AI IMAGE ================= */
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "stabilityai/sdxl",
        prompt: prompt,
        size: "1024x1024"
      })
    });

    const data = await response.json();

    const image = data.data?.[0]?.url;

    res.json({ image });

  } catch (err) {
    console.log(err);
    res.json({ image: null });
  }
});

/* ================= ORDER SAVE ================= */
app.post("/order", async (req, res) => {

  console.log("📦 Incoming Order:", req.body);

  try {
    const { wallet, product, tx } = req.body;

    const newOrder = await Order.create({ wallet, product, tx });

    console.log("✅ Saved:", newOrder);

    res.json({ success: true });

  } catch (err) {
    console.log("❌ ORDER ERROR:", err);
    res.json({ success: false });
  }
});

/* ================= GET ORDERS ================= */
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.log("❌ FETCH ERROR:", err);
    res.json([]);
  }
});

/* ================= FALLBACK (VERY IMPORTANT) ================= */
// 👉 ANY URL → index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("🚀 Server running with DB on port", PORT);
});
