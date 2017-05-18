'use strict'

class MarketDataController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request
  }

  fetchData (message) {
    // listening for message event
    const fetchData = Ws.channel('market')
    fetchData.emit('', 'data')
  }

}

module.exports = MarketDataController
