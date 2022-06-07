import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: './../config/.env' });

const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.PORT;
const database = process.env.DBNAME;

const { Pool } = pg;

const db = new Pool({
  user,
  password,
  host,
  port,
  database,
});

export default db;
