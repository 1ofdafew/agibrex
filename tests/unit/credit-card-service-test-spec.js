'use strict'

const chai = use('chai')
const assert = chai.assert
const CreditCard = use('App/Model/CreditCard')
const CreditCardService = make('App/Services/CreditCardService')
require('co-mocha')

describe('Credit Card Test Cases', function () {
  
  it('should be able to store', function * () {
    const credentials = {
      name: 'fareez',
      card_num: '2356789556451236',
      cvv: '345'
    }
    const creditCard = yield CreditCardService.store(credentials.name,
      credentials.card_num, credentials.cvv)

    // test the results
    assert.instanceOf(creditCard, CreditCard)
  })

  it('should fail for invalid number', function * () {
    const card = {
      name: 'Foo',
      card_num: 'foo',
      cvv: '123'
    }

    var foo
    try {
      foo = yield CreditCardService.store(card.name, card.card_num, card.cvv)      
    } catch (e) {}
    
    assert.equal(foo, null)
  })

  it('should fail for invalid CVV', function * () {
    const card = {
      name: 'Foo',
      card_num: '1234123412341234',
      cvv: 'abc'
    }

    var foo
    try {
      foo = yield CreditCardService.store(card.name, card.card_num, card.cvv)      
    } catch (e) {}

    assert.equal(foo, null)
  })

  it('should pass for complete detailed', function * () {
    const card = {
      name: 'Foo Bar',
      card_num: '1234123412341234',
      cvv: '122'
    }

    var foo
    try {
      foo = yield CreditCardService.store(card.name, card.card_num, card.cvv)      
    } catch (e) {}

    assert.notEqual(foo, null)
    assert.instanceOf(foo, CreditCard)
  })
})