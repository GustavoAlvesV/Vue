const {db} = require('./.env') //Quero so atributo db de dentro do .env, por isso usei destructor

module.exports = {
    client: 'postgresql',
    connection: db, 
    /*{
        database: 'knowledge',
        user: 'postgres',
        password: 'admin'
    }*/
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};

