
const chai = use('chai')
const assert = chai.assert
const User = use('App/Model/User')
require('co-mocha')

describe('User', function() {
  it('should be able to register user', function() {
    const user = new User()
    user.email = 'foo@bar.com'
    user.password = 'secret'

    const res = user.save()
    assert.instanceOf(res, User)
    assert.equal(res.status, 'pending-verification')
    assert.match(res.verification_code, /[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}/)    
  })
})
