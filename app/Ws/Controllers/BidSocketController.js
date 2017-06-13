'use strict'

const log = make('App/Services/LogService')

class BidSocketController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request

    log.debug('Connected socket id = %s', socket.id)
  }

  disconnected(socket) {
    log.debug('Socket disconnected, id = %s', socket.id)
  }

  * onMessage(message) {
    log.debug('Received message: ', message)
    this.socket.toEveryone().emit('message', message)
  }

  * update(data) {
    this.socket.toEveryone().emit('message', data)
  }

}

//Not done..

module.exports = BidSocketController
