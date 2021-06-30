module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: './data/dev.db3'
        },
        migrations: {
            directory: './migrations'
        },
        useNullAsDefault: true
    },
}