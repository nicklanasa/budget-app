const fs = require('fs');

exports.up = (knex, Promise) => {
  const sql = fs.readFileSync('./migrations/sql/initial_create.sql').toString();
  return knex.raw(sql);
};

exports.down = (knex, Promise) => {
  const sql = fs.readFileSync('./migrations/sql/initial_drop.sql').toString();
  return knex.raw(sql);
};
