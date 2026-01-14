require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const connectionString = process.env.POSTGRES_URL;
const useSsl = process.env.POSTGRES_SSL === 'true';

if (!connectionString) {
  console.error('POSTGRES_URL is not set. Set it in your .env or environment.');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
});

async function run() {
  try {
    const sqlPath = path.join(__dirname, '../db/init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    const client = await pool.connect();
    await client.query(sql);
    client.release();
    console.log('Database initialized successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  } finally {
    await pool.end().catch(()=>{});
  }
}

run();