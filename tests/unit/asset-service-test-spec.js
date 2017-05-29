'use strict'

const chai = use('chai')
const assert = chai.assert
const Asset = use('App/Model/Asset')
const AssetService = make('App/Services/AssetService')
require('co-mocha')

describe('Asset', function () {
  
  it('should be able to store asset', function * () {
    const credentials = {
      ast_trans_id: '12',
      type: 'LTC',
    }
    const asset = yield AssetService.store(credentials.ast_trans_id,
      credentials.type)

    // test the results
    assert.instanceOf(asset, Asset)
  })      
})