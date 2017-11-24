// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'db',
    multipleStatements: true
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
