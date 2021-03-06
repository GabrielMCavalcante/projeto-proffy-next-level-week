import Knex from "knex"

export async function up(knex: Knex) {
    await knex.schema.createTable("class_schedule", table => {
        table.increments()
        table.integer("week_day").notNullable()
        table.integer("from").notNullable()
        table.integer("to").notNullable()

        table.integer("__class_id")
            .notNullable()
            .references("id")
            .inTable("classes")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
        
        table.string("__user_id")
            .notNullable()
            .references("__id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    })
}

export async function down(knex: Knex) {
    await knex.schema.dropTable("class_schedule")
}