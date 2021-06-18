import { PoolClient, QueryResult } from 'pg'

export type Database = {
  id: number;
  name: string;
  collation: string;
  encoding: string;
  ctype: string;
}

export async function listDatabases (db: PoolClient): Promise<Database[]> {
  const listDbQuery = 'SELECT  oid AS id, ' +
                              'datname AS name, ' +
                              'pg_encoding_to_char(encoding) AS encoding, ' +
                              'datcollate AS collation, ' +
                              'datctype AS ctype ' +
                              'FROM pg_database;'

  const dbResults: QueryResult<Database> =
    await db.query<Database>(listDbQuery)

  return dbResults.rows.filter(r => (
    r.name !== 'template0' &&
      r.name !== 'template1'
  ))
}

export type Schema = {
  name: string;
  owner: string;
}

export async function listSchemas (db: PoolClient): Promise<Schema[]> {
  const listSchemaQuery = 'SELECT ' +
                            'schema_name AS name, ' +
                            'schema_owner AS owner ' +
                          'FROM information_schema.schemata'

  const dbResults: QueryResult<Schema> =
    await db.query<Schema>(listSchemaQuery)

  return dbResults.rows.filter(r => (
    !r.name.startsWith('pg_')
  ))
}

