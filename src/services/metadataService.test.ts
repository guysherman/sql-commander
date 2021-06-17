import { PoolClient } from 'pg'
import { loadProfiles, getProfile, Profile } from '../configuration'
import { getDbConnection } from './pgService'
import { listDatabases } from './metadataService'

let profile: Profile
let conn: PoolClient

beforeEach(async () => {
  await loadProfiles('/opt/app/data/tests/real-test-profiles.json')
  profile = getProfile('real')
  console.log(JSON.stringify(profile, null, '  '))
  conn = await getDbConnection(profile)
})

afterEach(() => {
  conn.release()
})

test('listDatabases() returns correct list of databases from valid connection', async () => {
  const results: string[] = await listDatabases(conn)
  expect(results.length).toBe(4)
  expect(false).toBe(true)
})

