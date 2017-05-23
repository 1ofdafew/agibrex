'use strict'

const Asset = use('App/Model/Asset')
const Database = use('Database');

class AssetController {

  * index(request, response) {

    const asset = yield Database.table('assets')
    response.json(asset)
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    
    const data = request.only(['ast_trans_id', 'type'])
    console.log('AssetController data....')
    console.log(data)

    const asset = new Asset(data)
    yield asset.save()
    response.ok(asset)
  }

  * show(request, response) {
    
    const id = request.param("id");


    const data = yield Database
      .table('assets')
      .select('ast_trans_id', 'type')
      .where({ id: id })
  }

}

module.exports = AssetController
