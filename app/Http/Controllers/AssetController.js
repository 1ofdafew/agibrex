'use strict'

const Asset = use('App/Model/Asset')
const Validator = use('App/Services/Validator')
const AssetService = make('App/Services/AssetService')

const Database = use('Database')
const log = make('App/Services/LogService')

class AssetController {

  * index(request, response) {
    const asset =  yield AssetService.showAll()
      response.json(asset)
    }

  * store(request, response) {
    const data = request.only('ast_trans_id', 'type')
      yield Validator.validate(data)

    const asset = yield AssetService.store(
      data.ast_trans_id, data.type)
     
      console.log('AssetController data....')
      console.log(data)

      response.json(asset)
    }

  * show(request, response) {
    const assets =  yield AssetService.show()
      response.json(assets)
    }
}

module.exports = AssetController