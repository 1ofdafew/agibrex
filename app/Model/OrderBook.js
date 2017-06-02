'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4')

class OrderBook extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  constructor(data) {
    super()

    // save all fields data
    this.user_id = data.user_id,
    this.amount = data.amount,
    this.price = data.price,
    this.status = data.status,
    this.asset = data.asset,
    this.to_asset = data.to_asset,
    this.type = data.type
  }

  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'OrderBook.createUUID')
  }  

  static get visible(){
    return ['id', 'uuid', 'type', 'asset', 'to_asset', 'amount', 'price', 'status','created_at']
  }


}

module.exports = OrderBook
