'use strict'

const Schema = use('Schema')

class CreditCardsTableSchema extends Schema {

  up () {
    this.create('credit_cards', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('uuid',80).notNullable().unique()
      table.string('name',254).notNullable()
      table.string('card_num',50).notNullable()
      table.integer('cbb',3).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('credit_cards')
  }

}

module.exports = CreditCardsTableSchema
