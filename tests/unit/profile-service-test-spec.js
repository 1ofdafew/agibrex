'use strict'

const chai = use('chai')
const assert = chai.assert
const Profile = use('App/Model/Profile')
const ProfileService = make('App/Services/ProfileService')
require('co-mocha')

describe('Profile Test Cases', function () {
  
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
  })  

  it('should fail for invalid email', function * () {
    const prfl = {
      name: 'fareez',
      email: '123df',
      mobile_no: '0127899546',
      address: 'taman mas puchong'
    }    

    var fareez
    try {
      fareez = yield ProfileService.store(prfl.name, prfl.email, prfl.mobile_no, prfl.address)      
    } catch (e) {}
    
    assert.equal(fareez, null)
  })

it('should fail for invalid mobile number', function * () {
    const prfl = {
      name: 'fareez',
      email: 'fareez@gmail.com',
      mobile_no: 'qwertyujkh',
      address: 'taman mas puchong'
    }

    var fareez
    try {
      fareez = yield ProfileService.store(prfl.name, prfl.email, prfl.mobile_no, prfl.address)      
    } catch (e) {}
    
    assert.equal(fareez, null)
  })

 it('should pass for complete detailed', function * () {
    const prfl = {
      name: 'fareez',
      email: 'fareez@gmail.com',
      mobile_no: '0127899546',
      address: 'taman mas puchong'
    }

    var fareez
    try {
      fareez = yield ProfileService.store(prfl.name, prfl.email, prfl.mobile_no, prfl.address)      
    } catch (e) {}
    
    //assert.equal(fareez, null)
    assert.instanceOf(fareez, Profile)
  })


 //update email
 it('should fail for invalid email', function * () {
    const prfl = {
      name: 'fareez',
      email: '123df',
      mobile_no: '0127899546',
      address: 'taman mas puchong'
    }    

    var fareez
    try {
      fareez = yield ProfileService.update(prfl.name, prfl.email, prfl.mobile_no, prfl.address)      
    } catch (e) {}
    
    assert.equal(fareez, null)
  })

//update mobile number
it('should fail for invalid mobile number', function * () {
    const prfl = {
      name: 'fareez',
      email: 'fareez@gmail.com',
      mobile_no: 'qwertyujkh',
      address: 'taman mas puchong'
    }

    var fareez
    try {
      fareez = yield ProfileService.update(prfl.name, prfl.email, prfl.mobile_no, prfl.address)      
    } catch (e) {}
    
    assert.equal(fareez, null)
  })
})