'use strict'

const chai = use('chai')
const assert = chai.assert
const Payment = use('App/Model/Payment')
const PaymentService = make('App/Services/PaymentService')
require('co-mocha')

describe('Payment', function () {
  
  it('should be able to store', function * () {
    const credentials = {
      trans_id: 'fareez',
      amount: 'fareez@gmail.com',
      mobile_no: '0127899546',
      type: 'taman mas puchong'
    }
    const payment = yield PaymentService.store(credentials.trans_id,
      credentials.amount, credentials.type)

    // test the results
    assert.instanceOf(payment, Payment)
  })      
})