'use strict'

const chai = use('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
require('co-mocha')

const Env = use('Env')
const CoinFactory = use('App/Services/Coins/CoinFactory')
const APIAuthService = make('App/Services/APIAuthService')

const ADMIN = Env.get('COIN_ADMIN')

describe('TractoCoin Unit Test', function() {
  
  it('should be able to create account, and get balance', function * () {
    const factory = new CoinFactory('tracto')
    const resp = yield factory.createWallet('foo', '1234')
    
    assert.equal(resp.data.wallet.type, 'TRACTO')

    const addr = resp.data.wallet.address
    const balance = yield factory.getBalance(addr)

    console.log('Balance:', balance)
    assert.notEqual(addr, null)
    assert.notEqual(balance, null)
  })

  it('should delete the user admin', function * () {
    const user = yield APIAuthService.delete(ADMIN)
  })

})