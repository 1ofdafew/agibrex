'use strict'

const Schema = use('Schema')

class PaymentsTableSchema extends Schema {

  up () {
    this.create('payments', (table) => {
      table.increments()
      table.string('uuid').notNullable().unique()
      table.string('trans_id').notNullable()
      table.double('amount').notNullable()
      table.string('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('payments')
  }

}

module.exports = PaymentsTableSchema
