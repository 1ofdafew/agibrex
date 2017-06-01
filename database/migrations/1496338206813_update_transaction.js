'use strict'

const Schema = use('Schema')

class UpdateTransactionTableSchema extends Schema {

  up () {

    this.table('transactions', (table) => {
        table.dropColumn('action')
        table.dropColumn('status')
        table.dropColumn('acc_type')
    })

    this.table('transactions', (table) => {
        table.integer('orderbook_id').after('uuid').notNullable()
        table.enum('asset', ['TRC','BTC','ETH','NONE']).after('orderbook_id').defaultTo('NONE')
        table.enum('to_asset', ['TRC','BTC','ETH','NONE']).after('asset').defaultTo('NONE')
        table.enum('action', ['BUY', 'SELL', 'TRANSFER']).after('to_asset').notNullable()
        table.enum('status', ['SUCCESS', 'FAILED', 'PENDING']).after('action').defaultTo('PENDING').notNullable()
        table.string('trace', 10).after('status').defaultTo(1)
    })
  }

  down () {
    this.table('transactions', (table) => {

    })
  }

}

module.exports = UpdateTransactionTableSchema
