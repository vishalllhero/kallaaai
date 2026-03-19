<!DOCTYPE html>
<html>
<head>
<title>KALLAA AI</title>
<script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.js"></script>

<style>
body {
  margin:0;
  font-family:Arial;
  background:#0f172a;
  color:white;
}

/* HEADER */
.header {
  display:flex;
  justify-content:space-between;
  padding:15px;
  background:#020617;
  border-bottom:1px solid #334155;
}

.brand {
  font-size:20px;
  font-weight:bold;
}

.wallet {
  font-size:12px;
  color:#38bdf8;
}

/* MAIN */
.container {
  max-width:900px;
  margin:auto;
  padding:20px;
}

/* CHAT */
.chat {
  height:350px;
  overflow-y:auto;
  background:#1e293b;
  padding:15px;
  border-radius:12px;
}

.msg {
  margin:10px 0;
}

.user { text-align:right; color:#38bdf8; }
.bot { text-align:left; color:white; }

/* INPUT */
.input-area {
  margin-top:10px;
  display:flex;
  gap:10px;
}

input {
  flex:1;
  padding:10px;
  border-radius:8px;
  border:none;
}

button {
  padding:10px;
  border:none;
  border-radius:8px;
  cursor:pointer;
}

.send { background:#38bdf8; }
.mic { background:#22c55e; }

/* PRODUCT */
.product {
  margin-top:20px;
  background:#1e293b;
  padding:15px;
  border-radius:10px;
}

/* BUY */
.buy {
  width:100%;
  background:#f59e0b;
  margin-top:10px;
}
</style>
</head>

<body>

<div class="header">
  <div class="brand">🤖 KALLAA AI</div>
  <button onclick="connectWallet()">Connect</button>
</div>

<div class="container">

  <p id="wallet" class="wallet"></p>

  <div class="chat" id="chat"></div>

  <div class="input-area">
    <input id="input" placeholder="Describe your design..." />
    <button class="send" onclick="send()">Send</button>
    <button class="mic" onclick="voice()">🎤</button>
  </div>

  <div class="product">
    <h3>👕 Choose Product</h3>
    <select id="product">
      <option>T-Shirt</option>
      <option>Hoodie</option>
    </select>

    <button class="buy" onclick="buy()">Buy with SOL</button>
  </div>

</div>

<script>

let walletAddress="";

// wallet
async function connectWallet(){
  const r=await window.solana.connect();
  walletAddress=r.publicKey.toString();
  document.getElementById("wallet").innerText=walletAddress;
}

// chat UI
function add(text,type){
  const c=document.getElementById("chat");
  const d=document.createElement("div");
  d.className="msg "+type;
  d.innerText=text;
  c.appendChild(d);
  c.scrollTop=c.scrollHeight;
}

// send
async function send(){
  let msg=document.getElementById("input").value;
  if(!msg)return;

  add("You: "+msg,"user");

  const res=await fetch("/chat",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({message:msg})
  });

  const data=await res.json();

  add("AI: "+data.reply,"bot");
  speak(data.reply);
}

// voice
function voice(){
  const r=new(window.SpeechRecognition||window.webkitSpeechRecognition)();
  r.lang="hi-IN";
  r.onresult=e=>{
    document.getElementById("input").value=e.results[0][0].transcript;
    send();
  };
  r.start();
}

// speak
function speak(t){
  const s=new SpeechSynthesisUtterance(t);
  s.lang="hi-IN";
  speechSynthesis.speak(s);
}

// buy
async function buy(){
  const conn=new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));

  const tx=new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey:window.solana.publicKey,
      toPubkey:new solanaWeb3.PublicKey("7E2tymKQgBZEjEYkDeTLqSXMNTLhF2LzQPGmrb39DvLZ"),
      lamports:0.01*solanaWeb3.LAMPORTS_PER_SOL
    })
  );

  const sig=await window.solana.signAndSendTransaction(tx);
  await conn.confirmTransaction(sig.signature);

  alert("Payment Done 🚀");

  await fetch("/order",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      wallet:walletAddress,
      product:document.getElementById("product").value,
      tx:sig.signature
    })
  });
}

</script>

</body>
</html>