const knex = require("knex");

const devConfig = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", // localhost
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "smart-brain",
  } || {
    connection: process.env.DATABASE_URL,
  },
});

const prodConfig = Object.assign({}, devConfig, {
  client: "pg",
  connection: process.env.DATABASE_URL,
});

module.exports = {
  development: devConfig,
  production: prodConfig,
};
