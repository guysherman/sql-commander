import { QueryResult } from 'pg'
import { loadProfiles, getProfile } from '../configuration'
import { getDbConnection } from './pgService'

beforeEach(async () => {
  await loadProfiles('/opt/app/data/tests/real-test-profiles.json')
})

test('returns a client that can query query the database', async () => {
  const profile = getProfile('real')
  console.log(`Profile:\n\n${JSON.stringify(profile, null, '  ')}`)
  const conn = await getDbConnection(profile)

  const result:QueryResult<any> = await conn.query('SELECT 1 AS col')
  const { rows: [{ col }] } = result

  expect(col).toEqual(1)

  conn.release()
})
