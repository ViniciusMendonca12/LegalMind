const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'familia100',
      database : 'gaa'
    }
  });

  module.exports = knex