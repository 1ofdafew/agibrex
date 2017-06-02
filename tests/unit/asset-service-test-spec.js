'use strict'

const chai = use('chai')
const assert = chai.assert
const Asset = use('App/Model/Asset')
const AssetService = make('App/Services/AssetService')
require('co-mocha')

describe('Asset Test Cases', function () {
  
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

  it('should fail for invalid transaction id', function * () {
    const ast = {
      ast_trans_id: 'ff',
      type: 'LTC',
    }

    var foo
    try {
      foo = yield AssetService.store(ast.ast_trans_id, ast.type)      
    } catch (e) {}
    
    assert.equal(foo, null)
  })

  it('should fail for invalid type', function * () {
    const ast = {
      ast_trans_id: '12',
      type: '1213',
    }

    var foo
    try {
      foo = yield AssetService.store(ast.ast_trans_id, ast.type)      
    } catch (e) {}
    
   // assert.equal(foo, null)
  })

  it('should pass for complete detailed', function * () {
    const ast = {
      ast_trans_id: '12',
      type: 'LTC',
    }

    var foo
    try {
      foo = yield AssetService.store(ast.ast_trans_id, ast.type)      
    } catch (e) {}
    
    //assert.equal(foo, null)
    //assert.instanceOf(foo, Asset)
  })
})