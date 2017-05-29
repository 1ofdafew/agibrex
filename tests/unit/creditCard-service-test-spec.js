'use strict'

const chai = use('chai')
const assert = chai.assert
const CreditCard = use('App/Model/CreditCard')
const CreditCardService = make('App/Services/CreditCardService')
require('co-mocha')

describe('creditCard', function () {
  
  it('should be able to store', function * () {
    const credentials = {
      name: 'fareez',
      card_num: '2356789556451236',
      cbb: '345'
    }
    const creditCard = yield CreditCardService.store(credentials.name,
      credentials.card_num, credentials.cbb)

    // test the results
    assert.instanceOf(creditCard, CreditCard)
  })      
})