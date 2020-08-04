import Knex from 'knex'

export async function up(knex: Knex) {
    await knex.schema.createTable('connections', table => {
        table.increments()
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            
        table.timestamp('created_at')
            .defaultTo('now()')
            .notNullable()
    })
}

export async function down(knex: Knex) {
    await knex.schema.dropTable('connections')
}