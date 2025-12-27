import { Pool, PoolConfig, QueryResult, QueryResultRow } from 'pg';

const poolConfig: PoolConfig = {
    connectionString: process.env.POSTGRES_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
}

const pool = new Pool(poolConfig);

export default pool;

// export async function query<T extends QueryResultRow>(
//   text: string,
//   params?: any[]
// ): Promise<QueryResult<T>> {
//   const start = Date.now();
//   const client = await pool.connect();
  
//   try {
//     const result = await client.query<T>(text, params);
//     const duration = Date.now() - start;
//     console.log('Executed query', { text, duration, rows: result.rowCount });
//     return result;
//   } finally {
//     client.release();
//   }
// }