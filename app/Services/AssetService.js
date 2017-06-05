'use strict'

const Database = use('Database')
const uuid = require('uuid/v4');

class AssetService{

  /**
   * injecting required dependencies auto fulfilled
   * by IoC container
   *
   * @return {Array}
   */
  static get inject () {
    return ['App/Model/Asset']
  }

  /**
   * Constructor
   * @param {Asset} - The Asset model
   */
  constructor (Asset) {
    this.Asset = Asset
  }

  //=>show all data
  * showAll() {
    return yield Database.table('assets')
  }

  //=>insert data asset
  * store (ast_trans_id, type){
    const asset = new this.Asset()

    asset.uuid = uuid()
    asset.ast_trans_id = ast_trans_id
    asset.type = type
    yield asset.save()

    const freshInstance = yield this.Asset.find(asset.id)
    return freshInstance
  }

  //=>show some data asset
  * show(){
    return yield Database
      .table('assets')
      .select('ast_trans_id', 'type')
      .where({ id: id })
  }
}

module.exports = AssetService
