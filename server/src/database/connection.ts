const knex = require('knex')
const path = require('path')

export default knex({
    client: 'sqlite3',
    connection: { filename: path.resolve(__dirname, 'database.sqlite') },
    useNullAsDefault: true
})