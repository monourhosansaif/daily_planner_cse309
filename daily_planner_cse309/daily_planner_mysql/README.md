# Daily Planner — Node.js + MySQL Backend
This project adds a simple Node.js + Express + MySQL backend to your Daily Planner HTML so the planner data can be saved and loaded from a MySQL database.

## What's included
- `server.js` — Express server with `/save` and `/load` endpoints
- `db.js` — MySQL connection helper (uses `mysql2`)
- `public/index.html` — Your planner UI with client-side save/load buttons
- `sql/create_db.sql` — SQL script to create database and table
- `.env.example` — example environment variables
- `package.json` — npm metadata

## Quick start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a MySQL database and run the SQL script:
   ```bash
   mysql -u root -p < sql/create_db.sql
   ```
   Or execute the commands inside the SQL file in your MySQL client.
3. Copy `.env.example` to `.env` and fill in your DB credentials.
4. Start the server:
   ```bash
   node server.js
   ```
5. Open `http://localhost:3000` in the browser to use the planner.

## Endpoints
- `POST /api/save` — saves planner JSON for a month/year (body: `{ monthyear: "...", data: {...} }`)
- `GET  /api/load?monthyear=October%202025` — loads the latest saved entry for that month/year

