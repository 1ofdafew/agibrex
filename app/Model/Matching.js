'use strict'

const Lucid = use('Lucid')

class Matching extends Lucid {

  bid () {
    return this.belongsTo('App/Model/OrderBook')
  }

  ask () {
    return this.belongsTo('App/Model/OrderBook')
  }

  static get visible(){
    return ['id', 'ask_id', 'bid_id', 'created_at', 'updated_at']
  }

}

module.exports = Matching
