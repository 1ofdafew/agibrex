'use strict'

const Lucid = use('Lucid')
const uuidV4 = require('uuid/v4');

class MarketData extends Lucid {

  constructor(data) {
    super()

    this.uuid = uuidV4()
    this.type = data.type
    this.volume = data.volume
    this.price = data.price
    this.exchange = data.exchange
  }

}

module.exports = MarketData
