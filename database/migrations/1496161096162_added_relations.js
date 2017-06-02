'use strict'

const Schema = use('Schema')

class AddedRelationsTableSchema extends Schema {

  up () {
    this.table('order_books', (table) => {
      // table.integer('user_id').unsigned().references('id').inTable('users').after('id')
    })
  }

  down () {
    this.table('order_books', (table) => {
      // table.dropColumn('user_id')
    })
  }

}

module.exports = AddedRelationsTableSchema
