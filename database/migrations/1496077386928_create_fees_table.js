'use strict'

const Schema = use('Schema')

class FeeTableSchema extends Schema {

  up () {
    this.create('fees', (table) => {
      table.increments()
      table.decimal('maker', 16,2).defaultTo('0.00')
      table.decimal('taker', 16,2).defaultTo('0.00')
      table.decimal('start_volume', 16,8).defaultTo('0.00000000')
      table.decimal('end_volume', 16,8).defaultTo('0.00000000')
    })
  }

  down () {
      this.drop('fees')
  }

}

module.exports = FeeTableSchema

//---- Fees Data ---------//
// INSERT INTO `fees` (`id`, `maker`, `taker`, `start_volume`, `end_volume`)
// VALUES
// 	(1, 0.16, 0.26, 0.00000001, 50000.00000000),
// 	(2, 0.14, 0.24, 50000.00000001, 100000.00000000),
// 	(3, 0.12, 0.22, 100000.00000001, 250000.00000000),
// 	(4, 0.10, 0.20, 250000.00000001, 500000.00000000),
// 	(5, 0.08, 0.18, 500000.00000001, 1000000.00000000),
// 	(6, 0.06, 0.16, 1000000.00000001, 2500000.00000000),
// 	(7, 0.04, 0.14, 2500000.00000001, 5000000.00000000),
// 	(8, 0.02, 0.12, 5000000.00000001, 10000000.00000000),
// 	(9, 0.00, 0.10, 10000000.00000001, 99999999.99999999);
