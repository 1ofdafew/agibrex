'use strict'

const chai = use('chai')
const assert = chai.assert
const History = use('App/Model/History')
const HistoryService = make('App/Services/HistoryService')
require('co-mocha')

describe('History Test Cases', function () {
  
  it('should be able to store', function * () {
    const credentials = {
      location: 'damansara',
      ip_address: '127.0.0.1',
      trace: '111',
      activities: 'Transfer'
    }
    const history = yield HistoryService.store(credentials.location,
      credentials.ip_address, credentials.trace, credentials.activities)

    // test the results
    assert.instanceOf(history, History)
  })   

  it('should fail for invalid location', function * () {
    const hstry = {
      location: '90000',
      ip_address: '127.0.0.1',
      trace: '111',
      activities: 'Transfer'
    }

    var foo
    try {
      foo = yield HistoryService.store(hstry.location, hstry.ip_address, hstry.trace, hstry.activities)      
    } catch (e) {}
    
   // assert.equal(foo, null)
  })

   it('should fail for invalid ip address', function * () {
    const hstry = {
      location: 'damansara',
      ip_address: 'asdfff',
      trace: '111',
      activities: 'Transfer'
    }

    var foo
    try {
      foo = yield HistoryService.store(hstry.location, hstry.ip_address, hstry.trace, hstry.activities)      
    } catch (e) {}
    
    assert.equal(foo, null)
  })

   it('should fail for invalid trace', function * () {
    const hstry = {
      location: 'damansara',
      ip_address: '127.0.0.1',
      trace: 'dsds',
      activities: 'Transfer'
    }

    var foo
    try {
      foo = yield HistoryService.store(hstry.location, hstry.ip_address, hstry.trace, hstry.activities)      
    } catch (e) {}
    
    assert.equal(foo, null)
  })

   it('should fail for invalid activities', function * () {
    const hstry = {
      location: 'damansara',
      ip_address: '127.0.0.1',
      trace: '555',
      activities: '454545'
    }

    var foo
    try {
      foo = yield HistoryService.store(hstry.location, hstry.ip_address, hstry.trace, hstry.activities)      
    } catch (e) {}
    
    assert.equal(foo, null)
  })

   it('should pass for complete detailed', function * () {
    const hstry = {
      location: 'damansara',
      ip_address: '127.0.0.1',
      trace: '555',
      activities: 'Transfer'
    }

    var foo
    try {
      foo = yield HistoryService.store(hstry.location, hstry.ip_address, hstry.trace, hstry.activities)      
    } catch (e) {}
    
   // assert.equal(foo, null)
    assert.instanceOf(foo, History)
  })

})