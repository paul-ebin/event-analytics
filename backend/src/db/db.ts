import pg, { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres',
})

const query = (text : string , params? : any[])=>{
    return pool.query(text, params)

}

export default pool;