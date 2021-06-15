import { Profile } from '../configuration/'
import { Pool, PoolClient } from 'pg'

let pool: Pool

export async function getDbConnection (profile: Profile): Promise<PoolClient> {
  if (!pool) {
    pool = new Pool(profile)
  }

  const connection = await pool.connect()
  return connection
}
