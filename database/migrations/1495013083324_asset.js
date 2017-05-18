'use strict'

const Schema = use('Schema')

class AssetTableSchema extends Schema {

  up () {
    this.create('asset', (table) => {
      table.increments()
      table.string('uuid')
      table.string('trans_id')
      table.string('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('asset')
  }

}

module.exports = AssetTableSchema
