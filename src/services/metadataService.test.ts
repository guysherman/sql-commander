import { PoolClient } from 'pg'
import { loadProfiles, getProfile, Profile } from '../configuration'
import { getDbConnection } from './pgService'
import {
  Database,
  listDatabases,
  listSchemas,
  listTables,
  listColumns,
  Schema,
  Table,
  Column
} from './metadataService'
import knex, { Knex } from 'knex'

let profile: Profile
let conn: PoolClient
let knexCon: Knex

beforeEach(async () => {
  await loadProfiles('/opt/app/data/tests/real-test-profiles.json')
  profile = getProfile('real')
  conn = await getDbConnection(profile)

  knexCon = knex({
    client: 'pg',
    connection: {
      ...profile
    },
    seeds: {
      directory: 'data/tests/seeds'
    },
    migrations: {
      directory: 'data/tests/migrations'
    }
  })

  await knexCon.migrate.latest()
  // await knexCon.seed.run();
})

afterEach(async () => {
  conn.release()
  await knexCon.destroy()
})

test("listDatabases() doesn't included template* databases", async () => {
  const results: Database[] = await listDatabases(conn)
  expect(results.length).toBe(2)
  const resultNames = results.map((r) => r.name)
  expect(resultNames).toContain('postgres')
  expect(resultNames).toContain('sqlcmdr')
})

test("listSchemas() doesn't include pg_ schemas", async () => {
  const results: Schema[] = await listSchemas(conn)
  expect(results.length).toBe(3)

  const noPg = results
    .map((r) => r.name)
    .reduce(
      (accum: boolean, curr: string) => accum && !curr.startsWith('pg_'),
      true
    )

  expect(noPg).toBe(true)
})

test('test1 schema contains 1 table', async () => {
  const [schema]: Schema[] | [schema: Schema] = await listSchemas(conn).then(schemas => schemas.filter(s => s.name === 'test1'))
  const results: Table[] = await listTables(conn, schema)
  expect(results.length).toBe(1)

  const [table] = results
  expect(table.name).toEqual('test_table')
  expect(table.schema).toBe(schema)
})

test('test_table should contain 10 columns', async () => {
  const [schema]: Schema[] | [schema: Schema] = await listSchemas(conn).then(schemas => schemas.filter(s => s.name === 'test1'))
  const [table]: Table[] | [table: Table] = await listTables(conn, schema).then(tables => tables.filter(t => t.name === 'test_table'))
  const columns: Column[] = await listColumns(conn, table)

  expect(columns.length).toBe(10)

  expect(columns[0].name).toEqual('id')
  expect(columns[0].datatype).toEqual('bigint')

  expect(columns[5].name).toEqual('bool_field')
  expect(columns[5].datatype).toEqual('boolean')
})
