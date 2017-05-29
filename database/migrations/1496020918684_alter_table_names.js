'use strict'

const Schema = use('Schema')

class AlterTableNamesTableSchema extends Schema {

  up () {
    this.drop('creditCard')
      this.create('credit_cards', (table) => {
      table.increments()
      table.string('uuid',80).notNullable().unique()
      table.string('name',254)
      table.integer('card_num',50)
      table.integer('cbb',3)
      table.timestamps()
    })
  }

  down () {
     this.drop('credit_card')

  }

}

module.exports = AlterTableNamesTableSchema
