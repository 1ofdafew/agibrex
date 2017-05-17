'use strict'

const Schema = use('Schema')

class AccountsTableSchema extends Schema {

  up () {
    this.create('accounts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('address', 255).notNullable().unique()
      table.string('acc_type', 10)
      table.decimal('bal_available', 16,8).defaultTo('0.00000000')
      table.decimal('bal_locked', 16,8).defaultTo('0.00000000')
      table.timestamps()
    })
  }

  down () {
    this.drop('accounts')
  }

}

module.exports = AccountsTableSchema
