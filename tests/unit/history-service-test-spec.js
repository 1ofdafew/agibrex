'use strict'

const chai = use('chai')
const assert = chai.assert
const History = use('App/Model/History')
const HistoryService = make('App/Services/HistoryService')
require('co-mocha')

describe('History', function () {
  
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
})