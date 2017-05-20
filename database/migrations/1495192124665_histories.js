'use strict'

const Schema = use('Schema')

class HistoriesTableSchema extends Schema {

  up () {
    this.create('histories', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('uuid').notNullable().unique()
      table.string('location').notNullable()
      table.string('ip_address').notNullable()
      table.string('trace').notNullable()
      table.string('activities').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('histories')
  }

}

module.exports = HistoriesTableSchema
