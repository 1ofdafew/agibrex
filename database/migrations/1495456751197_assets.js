'use strict'

const Schema = use('Schema')

class AssetsTableSchema extends Schema {

  up () {
    this.drop('assets')
    this.create('assets', (table) => {
      table.increments()
      table.string('uuid',80).notNullable().unique()
      table.string('ast_trans_id')
      table.varchar('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('assets')
  }

}

module.exports = AssetsTableSchema
