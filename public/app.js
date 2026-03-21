async function generate() {
  alert("AI image next step me add karenge 🔥");
}

function buyNormal(product) {
  alert("Normal payment system next step");
}

async function buySol(product) {
  alert("Solana payment next step");
}

async function connectWallet() {
  if (window.solana) {
    await window.solana.connect();
    alert("Wallet connected");
  }
}
