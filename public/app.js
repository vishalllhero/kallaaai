const app = document.getElementById("app");

app.innerHTML = `
  <div class="nav">
    <h2>KALLAA AI</h2>
    <div class="links">
      <span>MEN</span>
      <span>WOMEN</span>
      <span>KIDS</span>
    </div>
    <button onclick="connectWallet()">Connect Wallet</button>
  </div>

  <div class="hero">
    <div>
      <h1>FLAT 15% OFF</h1>
      <p>Design your AI clothes</p>
    </div>
    <img src="https://picsum.photos/400"/>
  </div>

  <div class="generator">
    <input id="prompt" placeholder="Describe design..." />
    <button onclick="generate()">Generate</button>
  </div>

  <div id="preview"></div>

  <div class="products">
    <div class="card">
      <img src="https://picsum.photos/200"/>
      <h3>T-Shirt</h3>
      <p>₹499</p>
      <button>Buy</button>
      <button>Buy with SOL</button>
    </div>
  </div>
`;

function generate() {
  const preview = document.getElementById("preview");
  preview.innerHTML = `<img src="https://picsum.photos/300"/>`;
}

function connectWallet() {
  alert("Wallet Connected");
}
