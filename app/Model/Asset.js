'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4');

class Asset extends Lucid {

  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'Asset.checkTransId')
    this.addHook('beforeCreate', 'Asset.checkType')
  }

    static get visible(){
    return ['id', 'uuid', 'ast_trans_id', 'type']
  }

  // user () {
  //   return this.belongsTo('App/Model/User')
  // }

}

module.exports = Asset
