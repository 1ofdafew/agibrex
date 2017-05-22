'use strict'

const Schema = use('Schema')

class ApiAuthsTableSchema extends Schema {

  up () {
    this.create('api_auths', (table) => {
      table.increments()
      table.string('username', 40).notNullable().unique()
      table.string('token', 190).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('api_auths')
  }

}

module.exports = ApiAuthsTableSchema
