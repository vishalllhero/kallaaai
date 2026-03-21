// FILE NAME: src/App.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState(false);

  const generateImage = () => {
    if (!prompt) return;
    setLoading(true);

    setTimeout(() => {
      setImage("https://picsum.photos/500/600");
      setLoading(false);
    }, 2000);
  };

  const connectWallet = () => {
    setWallet(true);
    alert("Wallet Connected (Demo)");
  };

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <div style={styles.nav}>
        <h2 style={styles.logo}>KALLAA AI</h2>
        <div style={styles.links}>
          <span>MEN</span>
          <span>WOMEN</span>
          <span>KIDS</span>
          <span>HOME</span>
        </div>
        <button onClick={connectWallet} style={styles.walletBtn}>
          {wallet ? "Connected" : "Connect Wallet"}
        </button>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <div>
          <h1 style={styles.heroText}>FLAT AI DESIGN</h1>
          <h1 style={styles.heroText}>CREATE & WEAR</h1>
          <p>Design your clothes using AI</p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1520975922284-9e0f8b6c1b5c"
          style={styles.heroImg}
        />
      </div>

      {/* AI GENERATOR */}
      <div style={styles.generator}>
        <input
          placeholder="Describe your AI design..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={styles.input}
        />
        <button onClick={generateImage} style={styles.generateBtn}>
          Generate
        </button>
      </div>

      {/* PREVIEW */}
      <div style={styles.preview}>
        {loading ? (
          <p>Generating...</p>
        ) : image ? (
          <motion.img
            src={image}
            style={styles.previewImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ) : (
          <p>Your AI design will appear here</p>
        )}
      </div>

      {/* PRODUCTS */}
      <div style={styles.products}>
        <div style={styles.card}>
          <img src={image || "https://picsum.photos/200"} style={styles.cardImg} />
          <h3>T-Shirt</h3>
          <p>₹499</p>
          <button style={styles.buy}>Buy</button>
          <button style={styles.sol}>Buy with SOL</button>
        </div>

        <div style={styles.card}>
          <img src={image || "https://picsum.photos/201"} style={styles.cardImg} />
          <h3>Hoodie</h3>
          <p>₹999</p>
          <button style={styles.buy}>Buy</button>
          <button style={styles.sol}>Buy with SOL</button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>© 2026 KALLAA AI</div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    background: "#fff",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    borderBottom: "1px solid #ddd",
    alignItems: "center",
  },
  logo: { fontWeight: "bold" },
  links: { display: "flex", gap: "20px" },
  walletBtn: {
    background: "black",
    color: "white",
    padding: "8px 15px",
    border: "none",
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    padding: "40px",
  },
  heroText: {
    fontSize: "50px",
    fontWeight: "bold",
    margin: 0,
  },
  heroImg: {
    width: "400px",
  },
  generator: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    padding: "20px",
  },
  input: {
    width: "400px",
    padding: "10px",
    border: "1px solid #ccc",
  },
  generateBtn: {
    background: "black",
    color: "white",
    padding: "10px 20px",
    border: "none",
  },
  preview: {
    textAlign: "center",
    padding: "20px",
  },
  previewImg: {
    width: "300px",
  },
  products: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    padding: "30px",
  },
  card: {
    textAlign: "center",
  },
  cardImg: {
    width: "200px",
    height: "250px",
    objectFit: "cover",
  },
  buy: {
    background: "black",
    color: "white",
    padding: "8px",
    marginTop: "10px",
    width: "100%",
  },
  sol: {
    background: "orange",
    color: "white",
    padding: "8px",
    marginTop: "5px",
    width: "100%",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    borderTop: "1px solid #ddd",
  },
};
