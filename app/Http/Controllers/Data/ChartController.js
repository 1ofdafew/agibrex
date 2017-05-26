'use strict'

const Helpers = use('Helpers')
const storagePath = Helpers.storagePath()

class BitcoinController {

  * bitcoin (request, response) {
    const data = Helpers.publicPath('exchange/bitcoin.json')
    response.download(data)
  }

  * ethereum (request, response) {
    const data = Helpers.publicPath('exchange/ethereum.json')
    response.download(data)
  }

  * apple (request, response) {
    const data = Helpers.publicPath('exchange/aapl.json')
    response.download(data)
  }
}

module.exports = BitcoinController
