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

export type Table = {
  name: string;
  schema?: Schema;
}

export async function listTables (db: PoolClient, schema: Schema): Promise<Table[]> {
  const { name: schemaName }: { name: string } = schema
  const listTablesQuery = 'SELECT table_name AS name FROM information_schema.tables WHERE table_schema=$1'
  const dbResults: QueryResult<Table> = await db.query<Table>(listTablesQuery, [schemaName])
  return dbResults.rows.map((r: Table): Table => ({
    schema,
    ...r
  }))
}

export type Column = {
  name: string;
  datatype: string;
  table?: Table;
}

export async function listColumns (db: PoolClient, table: Table): Promise<Column[]> {
  const { schema, name: tableName }: { schema?: Schema, name: string } = table
  const { name: schemaName }: { name: string } = schema || { name: '' }
  const listColumnsQuery = 'SELECT column_name AS name, data_type AS dataType ' +
    'FROM information_schema.columns WHERE table_schema=$1 AND table_name = $2'
  const dbResults: QueryResult<Column> = await db.query(listColumnsQuery, [schemaName, tableName])
  return dbResults.rows.map((r: Column): Column => ({
    table,
    ...r
  }))
}
