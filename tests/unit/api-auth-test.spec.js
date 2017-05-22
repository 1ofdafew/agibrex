'use strict'

const chai = use('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
const APIAuthService = make('App/Services/APIAuthService')
require('co-mocha')

chai.use(chaiHttp)

describe('API Test', function() {

  it('should allow us to delete existing user', function * () {
    const resp = yield APIAuthService.delete('foo')
    assert.equal(resp, null)
  })

  it('should return empty user', function * () {
    const resp = yield APIAuthService.getUser()
    assert.equal(resp, null)
  })

  it('should allow us to register', function * () {
    const resp = yield APIAuthService.register('foo', 'foo@bar.com', 'sa')

    assert.equal(resp.username, 'foo')
    assert.equal(resp.email, 'foo@bar.com')
  })

  it('should return existing user', function * () {
    const user = yield APIAuthService.getUser()
    assert.equal(user.id, 1)
    assert.equal(user.username, 'foo')
  })

  it('should allow us to authenticate, and get token', function * () {
    const resp = yield APIAuthService.authenticate('foo', 'sa')    
    assert.equal(resp.username, 'foo')
  })

  it('should return token', function * () {
    const token = yield APIAuthService.getToken('foo')
    assert.equal(token.username, 'foo')
  })
})