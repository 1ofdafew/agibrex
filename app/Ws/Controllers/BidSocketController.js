'use strict'

class BidSocketController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request

    console.log('Connected socket id = %s', socket.id)
  }

  disconnected(socket) {
    console.log('Socket disconnected, id = %s', socket.id)
  }

  * onMessage(message) {
    console.log('Received message: ', message)
    this.socket.toEveryone().emit('message', message)
  }

  * update(data) {
    this.socket.toEveryone().emit('message', data)
  }

}

//Not done..

module.exports = BidSocketController