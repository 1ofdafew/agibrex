'use strict'

const CoinException = use('App/Repositories/CoinException')

const TractoCoin = use('App/Repositories/TractoCoin')
const Bitcoin = use('App/Repositories/Bitcoin')
const Ethereum = use('App/Repositories/Ethereum')

class CoinFactory {

  constructor(type) {
    switch (type) {
      case 'tracto':
        return new TractoCoin()
      case 'bitcoin':
        return new Bitcoin()
      case 'ethereum':
        return new Ethereum()
      default:
        throw new CoinException('No such implementation')
    }
  }

}

module.exports = CoinFactory
