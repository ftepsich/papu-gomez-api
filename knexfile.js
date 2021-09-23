// Update with your config settings.
const migrations = {
    directory: './database/migrations',
    tableName: 'knex_migrations'
};

const seeds = {
    directory: './database/seed'
};

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host : '127.0.0.1',
            user : 'postgres',
            password : 'admin123',
            database : 'gestionturno',
            charset: 'utf8'
        },
        migrations,
        seeds,
        useNullAsDefault: true
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user:     'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations,
        seeds,
        ssl: { 
            rejectUnauthorized: false 
        },
        useNullAsDefault: true,
    },
};
