'use strict'

const Schema = use('Schema')

class ProfilesTableSchema extends Schema {

  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('uuid').notNullable().unique()
      table.string('name',254).notNullable()
      table.string('email',254).notNullable()
      table.varchar('mobile_no',15).notNullable()
      table.string('address',254)
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }

}

module.exports = ProfilesTableSchema
