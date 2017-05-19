'use strict'

const Schema = use('Schema')

class MarketDataTableSchema extends Schema {

  up () {
    this.create('MarketData', (table) => {
      table.increments()
      table.varchar('uuid', 10).notNullable().unique()
      table.varchar('type', 50)
      table.integer('volume', 12)
      table.double('price', 60)
      table.varchar('exchange', 60)
      table.timestamps()
    })
  }

  down () {
    this.drop('MarketData')
  }

}

module.exports = MarketDataTableSchema
