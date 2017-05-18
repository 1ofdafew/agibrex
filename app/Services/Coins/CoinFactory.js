'use strict'

const CoinException = use('App/Services/Coins/CoinException')

const TractoCoin = use('App/Services/Coins/TractoCoin')
const Bitcoin = use('App/Services/Coins/Bitcoin')
const Ethereum = use('App/Services/Coins/Ethereum')

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
