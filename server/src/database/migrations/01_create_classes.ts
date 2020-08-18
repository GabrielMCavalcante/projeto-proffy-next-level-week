import Knex from "knex"

export async function up(knex: Knex) {
    await knex.schema.createTable("classes", table => {
        table.increments()
        table.string("subject").notNullable()
        table.decimal("cost").notNullable()
        
        table.string("__user_id")
            .notNullable()
            .references("__id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })
}

export async function down(knex: Knex) {
    await knex.schema.dropTable("classes")
}