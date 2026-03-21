async function generate() {

  const prompt = document.getElementById("prompt").value;

  if (!prompt) {
    alert("Enter design first");
    return;
  }

  alert("🎨 Generating design...");

  try {
    const res = await fetch("/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();

    if (data.image) {
      document.getElementById("preview").src = data.image;
    } else {
      alert("❌ Failed to generate image");
    }

  } catch (err) {
    console.log(err);
    alert("❌ Error");
  }
}

/* NORMAL BUY */
function buyNormal(product) {
  alert("Normal payment coming next phase");
}

/* SOL BUY */
async function buySol(product) {
  alert("Solana payment next phase 🔥");
}

/* WALLET */
async function connectWallet() {
  if (window.solana) {
    await window.solana.connect();
    alert("Wallet Connected ✅");
  } else {
    alert("Install Phantom Wallet");
  }
}
