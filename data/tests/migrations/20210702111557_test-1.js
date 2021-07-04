
exports.up = async function (knex) {
  await knex.raw('CREATE SCHEMA test1')
  return knex.schema.withSchema('test1').createTable('test_table', (t) => {
    t.bigincrements('id')
    t.text('text_field')
    t.string('string_field')
    t.float('float_field')
    t.decimal('decimal_field')
    t.boolean('bool_field')
    t.date('date_field')
    t.datetime('datetime_field')
    t.time('time_field')
    t.timestamp('timestamp_field')
  })
}

exports.down = async function (knex) {
  await knex.schema.withSchema('test1').dropTable('test_table')
  return knex.raw('DROP SCHEMA test1')
}
