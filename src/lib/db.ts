import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}

export async function createConversation() {
  const res = await query(
    `INSERT INTO conversations DEFAULT VALUES RETURNING id`
  );
  return res.rows[0].id;
}

export async function insertMessage(conversationId: number, role: string, content: string) {
  const res = await query(
    `INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3) RETURNING id`,
    [conversationId, role, content]
  );
  return res.rows[0].id;
}