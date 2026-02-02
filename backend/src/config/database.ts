import { Pool as PgPool } from 'pg'
import mysql, { PoolConnection } from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

// Determine database type from environment
const DB_TYPE = process.env.DB_TYPE || 'postgresql' // 'postgresql' or 'mysql'

// PostgreSQL Pool
const pgPool = new PgPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433'),
  database: process.env.DB_NAME || 'stopdiabete',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'stopdiabete2026',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// MySQL Pool
const mysqlPool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME || 'stopdiabete_db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

// Unified query interface
interface QueryResult {
  rows: any[]
  rowCount: number
}

class DatabaseAdapter {
  private dbType: string

  constructor() {
    this.dbType = DB_TYPE
    this.setupEventHandlers()
  }

  private setupEventHandlers() {
    if (this.dbType === 'postgresql') {
      pgPool.on('connect', () => {
        console.log('✅ PostgreSQL Database connected successfully')
      })

      pgPool.on('error', (err: Error) => {
        console.error('❌ PostgreSQL error:', err)
      })
    } else {
      // Test MySQL connection
      mysqlPool.getConnection()
        .then((conn: any) => {
          console.log('✅ MySQL Database connected successfully')
          conn.release()
        })
        .catch((err: any) => {
          console.error('❌ MySQL connection error:', err)
        })
    }
  }

  async query(text: string, params?: any[]): Promise<QueryResult> {
    if (this.dbType === 'postgresql') {
      // PostgreSQL uses $1, $2, etc.
      const result = await pgPool.query(text, params)
      return {
        rows: result.rows,
        rowCount: result.rowCount || 0,
      }
    } else {
      // MySQL uses ? placeholders
      // Convert PostgreSQL-style placeholders ($1, $2) to MySQL-style (?)
      const mysqlQuery = text.replace(/\$(\d+)/g, '?')
      const [rows] = await mysqlPool.execute(mysqlQuery, params)
      
      return {
        rows: Array.isArray(rows) ? rows : [],
        rowCount: Array.isArray(rows) ? rows.length : 0,
      }
    }
  }

  async end(): Promise<void> {
    if (this.dbType === 'postgresql') {
      await pgPool.end()
    } else {
      await mysqlPool.end()
    }
  }

  getType(): string {
    return this.dbType
  }
}

const db = new DatabaseAdapter()

export default db

