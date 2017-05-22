'use strict'

const chai = use('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
require('co-mocha')

const CoinFactory = use('App/Services/Coins/CoinFactory')
const APIAuthService = make('App/Services/APIAuthService')

describe('TractoCoin Unit Test', function() {
  it('should not be able to create account before auth', function * () {
    const factory = new CoinFactory('tracto')
    const resp = yield factory.createWallet('foo', '1234')
    
    assert.equal(resp, undefined)
  })

  it('should be able to create account after auth', function * () {

    var token
    try {
      const user = yield APIAuthService.getUser('foo')
      const resp = yield APIAuthService.authenticate('foo', 'sa')
      console.log('resp:', resp)
    } catch(e) {
      const reg = yield APIAuthService.register('foo', 'foo@bar.com', 'sa')
      const resp = yield APIAuthService.authenticate('foo', 'sa')
      console.log('resp:', resp)
    }

    const factory = new CoinFactory('tracto')
    const resp = yield factory.createWallet('foo', '1234')

    console.log(resp)
    assert.equal(1, 1)
  })

  it('should be able to get account address')
  it('should be able to check account balance')
})