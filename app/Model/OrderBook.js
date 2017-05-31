'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4')

class OrderBook extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  constructor(data, user){
    super()

    if (!user || typeof (user.toJSON) !== 'function') {
      throw new Error('OrderBook expects a valid instance of User Model.')
    }

    this.uuid = uuid()
    this.user_id = user.id
    // this.type = data.type
    // this.asset = data.asset
    // this.to_asset = data.to_asset
    // this.amount = data.amount
    // this.price = data.price
    // this.status = data.status
    // this.created_at = data.created_at
  }

  static get visible(){
    return ['id', 'uuid', 'type', 'asset', 'to_asset', 'amount', 'price', 'status','created_at']
  }


}

module.exports = OrderBook
