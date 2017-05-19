'use strict'

const Schema = use('Schema')

class HistoryTableSchema extends Schema {

  up () {
    this.create('History', (table) => {
      table.increments()
      table.string('uuid')
      table.integer('location')
      table.integer('ip_addrs')
      table.integer('trace');
      table.integer('activities')
      table.timestamps()
    })
  }

  down () {
    this.drop('History')
  }

}

module.exports = HistoryTableSchema
