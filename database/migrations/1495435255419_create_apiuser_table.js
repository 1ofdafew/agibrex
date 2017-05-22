'use strict'

const Schema = use('Schema')

class ApiUsersTableSchema extends Schema {

  up () {
    this.create('api_users', (table) => {
      table.increments()
      table.string('uuid', 100).notNullable().unique()
      table.string('username', 100).notNullable().unique()
      table.string('email', 100).notNullable().unique()
      table.string('mobile_no', 100)
      table.string('password', 120).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('api_users')
  }

}

module.exports = ApiUsersTableSchema
