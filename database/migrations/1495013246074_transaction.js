'use strict'

const Schema = use('Schema')

class TransactionTableSchema extends Schema {

  up () {
    this.create('Transaction', (table) => {
      table.increments()
      table.string('uuid')
      table.string('action',254)
      table.string('status',254)
      table.string('acc_type',254)
      table.timestamps()
    })
  }

  down () {
    this.drop('Transaction')
  }

}

module.exports = TransactionTableSchema
