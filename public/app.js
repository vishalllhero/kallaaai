import React, { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = () => {
    if (!prompt) return;
    setLoading(true);

    setTimeout(() => {
      setImage("https://picsum.photos/400/400");
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.nav}>
        <h1>🔥 KALLAA AI</h1>
        <button style={styles.walletBtn}>Connect Wallet</button>
      </div>

      {/* Hero */}
      <div style={styles.hero}>
        <h2>Design. Wear. Sell — Powered by AI 🎨</h2>
        <p>Turn your imagination into wearable art</p>
      </div>

      {/* Input */}
      <div style={styles.inputBox}>
        <input
          placeholder="Cyberpunk dragon hoodie..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={styles.input}
        />
        <button onClick={generateImage} style={styles.generateBtn}>
          Generate
        </button>
      </div>

      {/* Preview */}
      <div style={styles.preview}>
        {loading ? (
          <p>Generating...</p>
        ) : image ? (
          <motion.img
            src={image}
            alt="Generated"
            style={styles.image}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          />
        ) : (
          <p>Your design will appear here</p>
        )}
      </div>

      {/* Products */}
      <div style={styles.products}>
        <div style={styles.card}>
          <h3>T-Shirt</h3>
          <p>Premium cotton AI print</p>
          <button style={styles.buyBtn}>Buy ₹499</button>
          <button style={styles.cryptoBtn}>Buy with SOL</button>
        </div>

        <div style={styles.card}>
          <h3>Hoodie</h3>
          <p>Premium AI hoodie</p>
          <button style={styles.buyBtn}>Buy ₹999</button>
          <button style={styles.cryptoBtn}>Buy with SOL</button>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        🚀 Built with AI + Web3 by KALLAA
      </div>
    </div>
  );
}

export default App;

/* STYLES */
const styles = {
  container: {
    background: "#020617",
    color: "white",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "sans-serif",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  walletBtn: {
    background: "#06b6d4",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },
  hero: {
    textAlign: "center",
    marginBottom: "30px",
  },
  inputBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    width: "300px",
    borderRadius: "8px",
    border: "none",
  },
  generateBtn: {
    background: "#f97316",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },
  preview: {
    textAlign: "center",
    marginBottom: "40px",
  },
  image: {
    width: "300px",
    borderRadius: "15px",
  },
  products: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    width: "200px",
    textAlign: "center",
  },
  buyBtn: {
    background: "#22c55e",
    border: "none",
    padding: "10px",
    width: "100%",
    marginTop: "10px",
    borderRadius: "8px",
    color: "white",
  },
  cryptoBtn: {
    background: "#fb923c",
    border: "none",
    padding: "10px",
    width: "100%",
    marginTop: "10px",
    borderRadius: "8px",
    color: "white",
  },
  footer: {
    textAlign: "center",
    marginTop: "40px",
    color: "#94a3b8",
  },
};
