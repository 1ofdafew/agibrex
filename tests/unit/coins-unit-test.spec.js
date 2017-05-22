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

describe('Coins Unit Test', function() {
  
  it('tracto: should be able to create account, and get balance', function * () {
    this.timeout(10000)

    const factory = new CoinFactory('tracto')
    const resp = yield factory.createWallet('foo', '1234')
    
    assert.equal(resp.data.wallet.type, 'TRACTO')

    const addr = resp.data.wallet.address
    const balance = yield factory.getBalance(addr)

    console.log('Balance:', balance)
    assert.notEqual(addr, null)
    assert.notEqual(balance, null)
  })

  it('bitcoin: should be able to create account, and get balance', function * () {
    this.timeout(10000)

    const factory = new CoinFactory('bitcoin')
    const resp = yield factory.createWallet('foo', '1234')
    
    assert.equal(resp.data.wallet.type, 'BITCOIN')

    const addr = resp.data.wallet.address
    const balance = yield factory.getBalance(addr)

    console.log('Balance:', balance)
    assert.notEqual(addr, null)
    assert.notEqual(balance, null)
  })

  it('ethereum: should be able to create account, and get balance', function * () {
    this.timeout(10000)

    const factory = new CoinFactory('ethereum')
    const resp = yield factory.createWallet('foo', '1234')
    
    assert.equal(resp.data.wallet.type, 'ETHEREUM')

    const addr = resp.data.wallet.address
    const balance = yield factory.getBalance(addr)

    console.log('Balance:', balance)
    assert.notEqual(addr, null)
    assert.notEqual(balance, null)
  })

  it('should delete the user admin', function * () {
    this.timeout(10000)    
    const user = yield APIAuthService.delete(ADMIN)
  })

})