import { PoolClient } from 'pg'

export async function listDatabases (db: PoolClient): Promise<string[]> {
  const listDbQuery = 'SELECT datname FROM pg_database'
  const dbResults = await db.query(listDbQuery)
  return dbResults.rows.map(r => r.datname)
}
