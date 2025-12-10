const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory store
const messages = [];

app.get('/api/messages', (req, res) => {
  // Return items sorted by ts
  const copy = messages.slice().sort((a,b)=>a.ts - b.ts);
  res.json(copy);
});

app.post('/api/messages', (req, res) => {
  const {author, content} = req.body || {};
  if(!author || !content) return res.status(400).json({error:'author and content required'});
  const msg = { id: messages.length + 1, author: String(author), content: String(content), ts: Date.now() };
  messages.push(msg);
  res.status(201).json(msg);
});

app.get('/health', (req,res)=> res.json({ok:true}));

app.listen(PORT, ()=> console.log('Server listening on',PORT));