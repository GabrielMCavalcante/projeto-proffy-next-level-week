import Knex from 'knex'

export async function up(knex: Knex) {
    await knex.schema.createTable('users', table => {
        table.increments()
        table.string('name').notNullable()
        table.string('avatar').notNullable()
        table.string('whatsapp').notNullable()
        table.string('bio').notNullable()
    })
}

export async function down(knex: Knex) {
    await knex.schema.dropTable('users')
}