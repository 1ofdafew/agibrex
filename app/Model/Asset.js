'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4');

class Asset extends Lucid {

  // constructor(data) {
  // super()

  //   console.log(`Asset data: ${data.ast_trans_id}`)
  //   console.log(JSON.stringify(data))

  //   this.uuid = uuid()
  //   this.ast_trans_id = data.ast_trans_id
  //   this.type = data.type
  // }

    static get visible(){
    return ['id', 'uuid', 'ast_trans_id', 'type']
  }

  // user () {
  //   return this.belongsTo('App/Model/User')
  // }

}

module.exports = Asset
