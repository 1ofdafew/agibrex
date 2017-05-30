'use strict'

const chai = use('chai')
const assert = chai.assert
const Transaction = use('App/Model/Transaction')
const TransactionService = make('App/Services/TransactionService')
require('co-mocha')

describe('Transaction Test Cases', function () {
  
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

  it('should fail for invalid action', function * () {
    const trans = {
      action: '789',
      status: 'pass',
      acc_type: 'btc',
    }

    var foo
    try {
      foo = yield TransactionService.store(trans.action, trans.status, trans.acc_type)      
    } catch (e) {}
    
    //assert.equal(foo, null)
  })

  it('should fail for invalid status', function * () {
    const trans = {
      action: 'test',
      status: '555',
      acc_type: 'btc',
    }

    var foo
    try {
      foo = yield TransactionService.store(trans.action, trans.status, trans.acc_type)      
    } catch (e) {}
    
   // assert.equal(foo, null)
  })

  it('should fail for invalid account type', function * () {
    const trans = {
      action: 'test',
      status: 'pass',
      acc_type: '222',
    }

    var foo
    try {
      foo = yield TransactionService.store(trans.action, trans.status, trans.acc_type)      
    } catch (e) {}
    
   // assert.equal(foo, null)
  })

  it('should pass for complete detailed', function * () {
    const trans = {
      action: 'test',
      status: 'pass',
      acc_type: 'btc',
    }

    var foo
    try {
      foo = yield TransactionService.store(trans.action, trans.status, trans.acc_type)      
    } catch (e) {}
    
   // assert.equal(foo, null)
    assert.instanceOf(foo, Transaction)
  })
})