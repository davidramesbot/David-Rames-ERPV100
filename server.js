const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = process.env.DATA_FILE || path.join('/tmp', 'erp-data.json');

app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname));

// GET - تحميل البيانات
app.get('/api/erp-data', (req, res) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      res.json({ success: true, data });
    } else {
      res.json({ success: true, data: null });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT - حفظ البيانات
app.put('/api/erp-data', (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ success: false });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST - sendBeacon عند إغلاق الصفحة
app.post('/api/erp-data', express.raw({ type: 'application/json', limit: '50mb' }), (req, res) => {
  try {
    const { data } = JSON.parse(req.body.toString());
    if (data) fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// كل الصفحات ترجع index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ DAVID RAMES ERP يعمل على: http://localhost:${PORT}`);
});
