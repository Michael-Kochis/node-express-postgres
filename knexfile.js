module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: './data/dev.db3'
        },
        migrations: {
            directory: './migrations'
        },
        pool: {
            afterCreate: (conn, done) => {
                conn.run("PRAGMA foreign_keys = ON", done);
            }
        },
        useNullAsDefault: true
    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 12
        },
        migrations: {
            tablename: "knex_migrations",
            directory: './migrations'
        }
    }
}