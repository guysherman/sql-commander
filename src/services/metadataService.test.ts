import { PoolClient } from 'pg'
import { loadProfiles, getProfile, Profile } from '../configuration'
import { getDbConnection } from './pgService'
import { Database, listDatabases, listSchemas, Schema } from './metadataService'

let profile: Profile
let conn: PoolClient

beforeEach(async () => {
  await loadProfiles('/opt/app/data/tests/real-test-profiles.json')
  profile = getProfile('real')
  conn = await getDbConnection(profile)
})

afterEach(() => {
  conn.release()
})

test('listDatabases() doesn\'t included template* databases', async () => {
  const results: Database[] = await listDatabases(conn)
  expect(results.length).toBe(2)
  const resultNames = results.map(r => r.name)
  expect(resultNames).toContain('postgres')
  expect(resultNames).toContain('sqlcmdr')
})

test('listSchemas() doesn\'t include pg_ schemas', async () => {
  const results: Schema[] = await listSchemas(conn)
  expect(results.length).toBe(2)

  const noPg = results
    .map(r => r.name)
    .reduce((accum: boolean, curr: string) =>
      accum && !curr.startsWith('pg_'), true)

  expect(noPg).toBe(true)
})
