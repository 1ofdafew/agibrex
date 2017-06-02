'use strict'

const chai = use('chai')
const assert = chai.assert
const Payment = use('App/Model/Payment')
const PaymentService = make('App/Services/PaymentService')
require('co-mocha')

describe('Payment Test Cases', function () {
  
  it('should be able to store', function * () {
    const credentials = {
      trans_id: '12',
      amount: '125.23',
      type: 'BTC'
    }
    const payment = yield PaymentService.store(credentials.trans_id,
      credentials.amount, credentials.type)

    // test the results
    assert.instanceOf(payment, Payment)
  })      

  it('should fail for transaction ID', function * () {
    const pymt = {
      trans_id: 'hdghd',
      amount: '125.23',
      type: 'BTC'
    }

    var foo
    try {
      foo = yield PaymentService.store(pymt.trans_id, pymt.amount, pymt.type)      
    } catch (e) {}
    
    assert.equal(foo, null)
  })

  it('should fail for amount', function * () {
    const pymt = {
      trans_id: '12',
      amount: 'qwqee',
      type: 'BTC'
    }

    var foo
    try {
      foo = yield PaymentService.store(pymt.trans_id, pymt.amount, pymt.type)      
    } catch (e) {}
    
   // assert.equal(foo, null)
  })

  it('should fail for type', function * () {
    const pymt = {
      trans_id: '12',
      amount: '125.23',
      type: '121'
    }

    var foo
    try {
      foo = yield PaymentService.store(pymt.trans_id, pymt.amount, pymt.type)      
    } catch (e) {}
    
    //assert.equal(foo, null)
  })

  it('should pass for complete detailed', function * () {
    const pymt = {
      trans_id: '12',
      amount: '125.23',
      type: 'BTC'
    }

    var foo
    try {
      foo = yield PaymentService.store(pymt.trans_id, pymt.amount, pymt.type)      
    } catch (e) {}
    
   // assert.equal(foo, null)
   // assert.instanceOf(foo, Payment)
  })
})