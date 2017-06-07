'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4')
const log = use('npmlog')

class OrderBook extends Lucid {

  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'OrderBook.createUUID')
  }

  static get visible(){
    return ['id', 'uuid', 'type', 'asset', 'to_asset', 'amount', 'balance', 'price', 'status','created_at']
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

  bids () {
    return this.hasMany('App/Model/OrderBook')
  }

  asks () {
    return this.hasMany('App/Model/OrderBook')
  }

}

module.exports = OrderBook
