'use strict'

const Schema = use('Schema')

class PaymentTableSchema extends Schema {

  up () {
    this.create('Payment', (table) => {
      table.increments()
      table.string('uuid').notNullable().unique()
      table.string('trans_id').notNullable()
      table.double('amount').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('Payment')
  }

}

module.exports = PaymentTableSchema
