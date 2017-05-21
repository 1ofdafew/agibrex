'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4');

class MarketData extends Lucid {

  constructor(data) {
    super()

    this.uuid = uuid()
    this.type = data.type
    this.volume = data.volume
    this.price = data.price
    this.exchange = data.exchange
  }

}

module.exports = MarketData
