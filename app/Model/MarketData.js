'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4');

class MarketData extends Lucid {

  constructor(data) {
    super()

	  // this is how the data looks
	  //   symbol: resp.data.symbol,
	  //   price: resp.data.price.usd,
	  //   change1h: resp.data.change1h,
	  //   change24h: resp.data.change24h,
	  //   volume24h: {
	  //   	usd: resp.data.volume24.usd,
	  //   	eur: resp.data.volume24.eur,
	  //   	btc: resp.data.volume24.btc
	  //   }
		this.symbol = data.symbol
		this.price = data.price
		this.change1h = data.change1h
		this.change24h = data.change24h
		this.vol24h_usd = data.volume24h.usd
		this.vol24h_eur = data.volume24h.eur
		this.vol24h_btc = data.volume24h.btc
  }

}

module.exports = MarketData
