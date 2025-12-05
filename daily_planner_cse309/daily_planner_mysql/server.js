// server.js - simple Express server to save/load planner data
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(express.static('public'));

// Save endpoint
app.post('/api/save', async (req, res) => {
  try {
    const { monthyear, data } = req.body;
    if (!monthyear || !data) {
      return res.status(400).json({ error: 'monthyear and data are required' });
    }
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.query(
        'INSERT INTO planner_entries (monthyear, data) VALUES (?, ?)',
        [monthyear, JSON.stringify(data)]
      );
      res.json({ success: true, id: result.insertId });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Load endpoint - returns the latest entry for given monthyear
app.get('/api/load', async (req, res) => {
  try {
    const monthyear = req.query.monthyear;
    if (!monthyear) return res.status(400).json({ error: 'monthyear required' });

    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query(
        'SELECT id, data, created_at FROM planner_entries WHERE monthyear = ? ORDER BY created_at DESC LIMIT 1',
        [monthyear]
      );
      if (!rows || rows.length === 0) return res.json({ found: false });
      const entry = rows[0];
      res.json({ found: true, id: entry.id, data: entry.data, created_at: entry.created_at });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
