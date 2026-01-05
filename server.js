// server.js
// Minimal WebSocket broadcast server for JaMusic inbox
const fs = require('fs');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

function readMessages() {
  try {
    if (!fs.existsSync(MESSAGES_FILE)) return [];
    const raw = fs.readFileSync(MESSAGES_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch(e) {
    console.warn('readMessages error', e);
    return [];
  }
}
function saveMessages(arr) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(arr, null, 2), 'utf8');
  } catch(e) {
    console.warn('saveMessages error', e);
  }
}

// HTTP server (not serving index.html — this is WS only; you can extend to serve static files)
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('JaMusic WS server running');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
  console.log('Client connected');
  // send initial messages
  const msgs = readMessages();
  socket.send(JSON.stringify({ type: 'all_messages', messages: msgs }));

  socket.on('message', (raw) => {
    try {
      const data = JSON.parse(raw.toString());
      if(!data) return;
      if(data.type === 'get_messages'){
        const current = readMessages();
        socket.send(JSON.stringify({ type:'all_messages', messages: current }));
      } else if(data.type === 'broadcast' && data.msg){
        // Add to store
        const messages = readMessages();
        messages.push(data.msg);
        saveMessages(messages);
        // Broadcast to all clients
        const payload = JSON.stringify({ type:'new_broadcast', msg: data.msg });
        wss.clients.forEach(c => { try { if(c.readyState === WebSocket.OPEN) c.send(payload); } catch(e){} });
        console.log('Broadcasted message:', data.msg.title || data.msg.subject);
      }
    } catch(e){
      console.warn('Invalid message from client', e);
    }
  });

  socket.on('close', () => console.log('Client disconnected'));
});

server.listen(PORT, () => {
  console.log(`JaMusic WS server listening on ws://localhost:${PORT}`);
});
