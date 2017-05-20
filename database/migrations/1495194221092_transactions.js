'use strict'

const Schema = use('Schema')

class TransactionsTableSchema extends Schema {

  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('uuid').notNullable().unique()
      table.string('action',254).notNullable()
      table.string('status',254).notNullable()
      table.string('acc_type',254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }

}

module.exports = TransactionsTableSchema
