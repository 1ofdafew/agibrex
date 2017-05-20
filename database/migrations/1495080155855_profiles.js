'use strict'

const Schema = use('Schema')

class ProfilesTableSchema extends Schema {

  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.string('uuid', 40).unique()
      table.string('name')
      table.string('email')
      table.varchar('tel_no')
      table.string('addrs')
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }

}

module.exports = ProfilesTableSchema
