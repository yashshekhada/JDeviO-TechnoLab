const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Gzip compression
app.use(compression());

// Static files (PWA + website)
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    // Service worker — no cache
    if (filePath.endsWith('service-worker.js')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// JSON body parser for API
app.use(express.json());

// ===== API Routes =====

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  console.log(`📬 New contact from ${name} <${email}>`);
  console.log(`   Service: ${service || 'Not specified'}`);
  console.log(`   Message: ${message}`);

  // In production, send email / save to DB here
  res.json({ success: true, message: 'Thanks! We\'ll be in touch within 24 hours.' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// ===== SPA Fallback =====
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`\n⚡ JDevio TechnoLab server running`);
  console.log(`   Local:  http://localhost:${PORT}`);
  console.log(`   API:    http://localhost:${PORT}/api/health\n`);
});
