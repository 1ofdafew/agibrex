'use strict'

const Database = use('Database')
const uuid = require('uuid/v4');


class TransactionService{

  /**
   * injecting required dependencies auto fulfilled
   * by IoC container
   *
   * @return {Array}
   */
  static get inject () {
    return ['App/Model/Transaction']
  }

  /**
   * Constructor
   * @param {Transaction} - The Transaction model
   */
  constructor (Transaction) {
    this.Transaction = Transaction
  }

  //=>show all data
  * showAll() {
    return yield Database.table('transactions')
  }

  //=>insert data transaction
  * store (action, status, acc_type){
  	const transaction = new this.Transaction()

  	transaction.uuid = uuid()
    transaction.action = action
    transaction.status = status
    transaction.acc_type = acc_type 

    yield transaction.save()

    const freshInstance = yield this.Transaction.find(transaction.id)

    return freshInstance
  }

  //=>show some data transaction
  * show(){
  	return yield Database
    .table('transactions')
    .select('action', 'status', 'acc_type')
    .where({id:id})
  }
}

module.exports = TransactionService