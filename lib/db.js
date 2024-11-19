// lib/db.js
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
};

export async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Connected to MSSQL');
  } catch (err) {
    console.error('Database connection failed: ', err);
  }
}

export default sql;