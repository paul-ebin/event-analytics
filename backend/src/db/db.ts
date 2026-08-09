    import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function connectDatabase() {
  try {
    const client = await pool.connect();

    console.log(" PostgreSQL Connected");

    client.release();
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error);

    process.exit(1);
  }
}