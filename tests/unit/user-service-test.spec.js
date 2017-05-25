'use strict'

const chai = use('chai')
const assert = chai.assert
const User = use('App/Model/User')
const UserService = make('App/Services/UserService')
require('co-mocha')

describe('User', function () {
  
  it('should be able to register user', function * () {
    const credentials = {
      username: 'foo',
      email: 'foo@bar.com',
      password: 'secret'
    }
    const user = yield UserService.register(credentials.username,
      credentials.email, credentials.password)

    // test the results
    assert.instanceOf(user, User)
    assert.equal(user.status, 'pending-verification')
  })      
})
