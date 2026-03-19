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


// 🗄️ DATABASE CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/kallaa")
  .then(() => console.log("DB Connected 🔥"))
  .catch(err => console.log(err));


// 📦 SCHEMA
const OrderSchema = new mongoose.Schema({
  wallet: String,
  product: String,
  tx: String,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);


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
          { role: "system", content: "You are KALLAA AI helping design clothes." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices?.[0]?.message?.content || "No reply"
    });

  } catch {
    res.json({ reply: "Error 😢" });
  }
});


// 💰 ORDER SAVE
app.post("/order", async (req, res) => {
  const { wallet, product, tx } = req.body;

  await Order.create({ wallet, product, tx });

  res.json({ success: true });
});


// 🧑‍💼 ADMIN PANEL
app.get("/admin", async (req, res) => {
  const orders = await Order.find().sort({ date: -1 });

  let html = `
    <h1>KALLAA Orders</h1>
    <table border="1" cellpadding="10">
    <tr>
      <th>Wallet</th>
      <th>Product</th>
      <th>Transaction</th>
      <th>Date</th>
    </tr>
  `;

  orders.forEach(o => {
    html += `
      <tr>
        <td>${o.wallet}</td>
        <td>${o.product}</td>
        <td>${o.tx}</td>
        <td>${o.date}</td>
      </tr>
    `;
  });

  html += "</table>";

  res.send(html);
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🔥 Server running with DB");
});