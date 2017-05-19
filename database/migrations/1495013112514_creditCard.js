'use strict'

const Schema = use('Schema')

class CreditCardTableSchema extends Schema {

  up () {
    this.create('CreditCard', (table) => {
      table.increments()
      table.string('uuid')
      table.string('name',254)
      table.integer('num',50)
      table.integer('cbb',3)
      table.timestamps()
    })
  }

  down () {
    this.drop('CreditCard')
  }

}

module.exports = CreditCardTableSchema
