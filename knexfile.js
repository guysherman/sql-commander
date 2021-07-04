module.exports = {
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'sqlcmdr',
    password: 'password',
    database: 'sqlcmdr'
  },
  seeds: {
    directory: 'data/tests/seeds'
  },
  migrations: {
    directory: 'data/tests/migrations'
  }
}
