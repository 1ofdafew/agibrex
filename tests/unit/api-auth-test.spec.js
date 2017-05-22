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
  })

  it('should allow us to register', function * () {
    const resp = yield APIAuthService.register('foo', 'foo@bar.com', 'sa')

    assert.equal(resp.username, 'foo')
    assert.equal(resp.email, 'foo@bar.com')
  })
})