'use strict'

const chai = use('chai')
const assert = chai.assert
const Transaction = use('App/Model/Transaction')
const TransactionService = make('App/Services/TransactionService')
require('co-mocha')

describe('Transaction', function () {
  
  it('should be able to store', function * () {
    const credentials = {
      action: 'test',
      status: 'pass',
      acc_type: 'btc'
    }
    const transaction = yield TransactionService.store(credentials.action,
      credentials.status, credentials.acc_type)

    // test the results
    assert.instanceOf(transaction, Transaction)
  })      
})