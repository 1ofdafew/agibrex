'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4');


class History extends Lucid {

  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'History.checkLocation')
    this.addHook('beforeCreate', 'History.checkIpAddress')
    this.addHook('beforeCreate', 'History.checkTrace')
  }

  static get visible(){
    return ['id', 'uuid', 'location', 'ip_address', 'trace', 'activities']
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = History
