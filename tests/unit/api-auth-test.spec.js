'use strict'

const chai = use('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
const APIAuthService = make('App/Services/APIAuthService')
require('co-mocha')

chai.use(chaiHttp)

describe('API Test', function() {

  it('should allow us to delete existing user', function * () {
    this.timeout(10000)
    try {
      const resp = yield APIAuthService.delete('foo')
      assert.equal(resp.status, 'ok')
    } catch(e) {}
  })

  it('should return empty user', function * () {
    this.timeout(10000)
    try {
      const resp = yield APIAuthService.getUser('foo')      
    } catch(e) {}
  })

  it('should allow us to register', function * () {
    this.timeout(10000)
    const resp = yield APIAuthService.register('foo', 'foo@bar.com', 'sa')

    assert.equal(resp.username, 'foo')
    assert.equal(resp.email, 'foo@bar.com')
  })

  it('should return existing user', function * () {
    this.timeout(10000)
    const user = yield APIAuthService.getUser('foo')
    assert.equal(user.id, 1)
    assert.equal(user.username, 'foo')
  })

  it('should allow us to authenticate, and get token', function * () {
    this.timeout(10000)
    const resp = yield APIAuthService.authenticate('foo', 'sa')
    assert.equal(resp.username, 'foo')
  })

  it('should return token', function * () {
    this.timeout(10000)
    const token = yield APIAuthService.getToken('foo')
    assert.equal(token.username, 'foo')
  })

  it('should allow us to delete existing user', function * () {
    this.timeout(10000)
    const resp = yield APIAuthService.delete('foo')
    assert.equal(resp.status, 'ok')
  })

})