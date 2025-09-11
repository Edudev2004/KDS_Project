const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kds_restaurante',
    password: 'xXtheshieldXx1',
    port: 5432
});

pool.connect()
    .then(client => {
        console.log("Conectado a PostgreSQL");
        client.release();
    })
    .catch(err => console.error("Error conectando a PostgreSQL", err));

module.exports = pool;