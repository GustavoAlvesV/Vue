const config = require('../knexfile.js')

const knex = require('knex')(config)

//const knex = require ('knex')
//const connection = knex(config)

knex.migrate.latest([config]) // vai ser executado as migrações no momento que eu carregar meu backend (no precisa usar cmd)


module.exports = knex

