'use strict'

const chai = use('chai')
const assert = chai.assert
const Profile = use('App/Model/Profile')
const ProfileService = make('App/Services/ProfileService')
require('co-mocha')

describe('Profile', function () {
  
  it('should be able to store', function * () {
    const credentials = {
      name: 'fareez',
      email: 'fareez@gmail.com',
      mobile_no: '0127899546',
      address: 'taman mas puchong'
    }
    const profile = yield ProfileService.store(credentials.name,
      credentials.email, credentials.mobile_no, credentials.address)

    // test the results
    assert.instanceOf(profile, Profile)
    assert.equal(profile.status, 'pending-verification')
  })      
})