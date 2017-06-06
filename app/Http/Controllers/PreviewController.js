'use strict'

const axios = require('axios')
const co = require('co')

class PreviewController {

  * index (request, response) {
    axios.get('https://blockchain.info/ticker')
      .then(function (resp) {
        co(function * () {
          const data = resp.data
          yield response.sendView('preview', {data: data})
        })
      })
  }

  * invited (request, response) {
    // process invited guest
  }
}

module.exports = PreviewController
