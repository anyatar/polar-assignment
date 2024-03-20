import mysql, { Connection } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Singleton
let connection: Connection | null = null;
function createMySQLConnection(): Connection {
  try {
    if (!connection) {
      connection = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'mydatabase'
      });
    }  
    return connection;
  } catch (error) {
    console.error('Error creating MySQL connection:', error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}

export default createMySQLConnection();