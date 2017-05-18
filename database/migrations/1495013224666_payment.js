'use strict'

const Schema = use('Schema')

class PaymentTableSchema extends Schema {

  up () {
    this.create('Payment', (table) => {
      table.increments()
      table.string('uuid')
      table.string('trans_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('Payment')
  }

}

module.exports = PaymentTableSchema
